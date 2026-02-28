<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuditStore } from 'src/stores/AuditStore';
import type { MonthlySalesRow } from 'src/utils/static/types';
import type { QTableColumn } from 'quasar';
import { exportFile, useQuasar } from 'quasar';

const $q = useQuasar();

const auditStore = useAuditStore();
const yearInput = ref('');

const { monthlySales, loading } = storeToRefs(auditStore);

const rows = ref<MonthlySalesRow[]>([]);

watch(
  () => monthlySales.value,
  (newData) => {
    rows.value = Object.entries(newData).map(([month, val]): MonthlySalesRow => {
      const gross = Number(val) || 0;
      return {
        month,
        gross,
        office_expenses: 0,
        office_utilities: 0,
        office_rent: 0,
        // We calculate net income dynamically
        get approx_net_income() {
          return this.gross - (this.office_expenses + this.office_utilities + this.office_rent);
        },
      };
    });
  },
  { immediate: true },
);

const columns: QTableColumn[] = [
  { name: 'Month', label: 'Month', field: 'month', align: 'left' },
  { name: 'Gross', label: 'Gross', field: 'gross', align: 'left' },
  { name: 'OfficeExpenses', label: 'Office Expenses', field: 'office_expenses', align: 'left' },
  { name: 'OfficeUtilities', label: 'Office Utilities', field: 'office_utilities', align: 'left' },
  { name: 'OfficeRent', label: 'Office Rent', field: 'office_rent', align: 'left' },
  {
    name: 'ApproxNetIncome',
    label: 'Approx Net Income',
    field: 'approx_net_income',
    align: 'left',
  },
];

const columnTotals = computed(() => {
  const totals = {
    gross: 0,
    expenses: 0,
    utilities: 0,
    rent: 0,
    net: 0,
  };

  rows.value.forEach((row) => {
    totals.gross += row.gross;
    totals.expenses += row.office_expenses;
    totals.utilities += row.office_utilities;
    totals.rent += row.office_rent;
    totals.net += row.approx_net_income ?? 0;
  });

  return totals;
});

const generateSales = async () => {
  if (!yearInput.value) return;
  await auditStore.fetchMonthlySales(yearInput.value);
};

type ColumnFormatFn = (val: unknown, row: MonthlySalesRow) => unknown;

function wrapCsvValue(
  val: string | number | boolean | undefined | null,
  formatFn?: ColumnFormatFn,
  row?: MonthlySalesRow,
) {
  const formatted: unknown = formatFn !== void 0 && row !== void 0 ? formatFn(val, row) : val;

  if (formatted === void 0 || formatted === null) {
    return '""';
  }

  let stringVal = '';
  if (typeof formatted === 'string') {
    stringVal = formatted;
  } else if (typeof formatted === 'number' || typeof formatted === 'boolean') {
    stringVal = String(formatted);
  } else {
    stringVal = '';
  }

  return `"${stringVal.split('"').join('""')}"`;
}

const exportTable = () => {
  const header = columns.map((col) => wrapCsvValue(col.label));

  const body = rows.value.map((row) =>
    columns.map((col) => {
      const rawValue =
        typeof col.field === 'function' ? col.field(row) : row[col.field as keyof MonthlySalesRow];

      return wrapCsvValue(
        rawValue as string | number | boolean | undefined | null,
        col.format as ColumnFormatFn | undefined,
        row,
      );
    }),
  );

  const footer = [
    [
      '"TOTAL"',
      wrapCsvValue(columnTotals.value.gross),
      wrapCsvValue(columnTotals.value.expenses),
      wrapCsvValue(columnTotals.value.utilities),
      wrapCsvValue(columnTotals.value.rent),
      wrapCsvValue(columnTotals.value.net),
    ],
  ];

  const content = [header, ...body, ...footer].map((rowArray) => rowArray.join(',')).join('\r\n');

  const status = exportFile(
    `monthly-sales-${yearInput.value || 'export'}.csv`,
    content,
    'text/csv',
  );

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning',
    });
  }
};
</script>
<template>
  <q-card-section class="q-pt-none">
    <div class="q-pb-md row justify-between items-center filter-form">
      <div class="row">
        <q-input
          class="rounded-input q-mr-sm"
          v-model="yearInput"
          placeholder="Input Year (e.g. 2024)"
          dense
          outlined
          type="text"
        />
        <q-btn
          label="Generate Sales"
          class="q-px-sm bg-primary"
          flat
          dense
          color="white"
          @click="generateSales"
          :loading="loading"
        />
      </div>
    </div>
    <q-table
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="month"
      bordered
      flat
      :pagination="{ rowsPerPage: 0 }"
      hide-pagination
    >
      <template v-slot:body-cell-OfficeExpenses="props">
        <q-td :props="props">
          <q-input
            v-model.number="props.row.office_expenses"
            type="number"
            dense
            outlined
            input-class="text-right"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-OfficeUtilities="props">
        <q-td :props="props">
          <q-input
            v-model.number="props.row.office_utilities"
            type="number"
            dense
            outlined
            input-class="text-right"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-OfficeRent="props">
        <q-td :props="props">
          <q-input
            v-model.number="props.row.office_rent"
            type="number"
            dense
            outlined
            input-class="text-right"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-ApproxNetIncome="props">
        <q-td :props="props" class="text-weight-bold">
          <span :class="props.row.approx_net_income < 0 ? 'text-negative' : 'text-positive'">
            {{ props.row.approx_net_income.toLocaleString() }}
          </span>
        </q-td>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:bottom-row>
        <q-tr class="bg-grey-2 text-weight-bold">
          <q-td>TOTAL</q-td>
          <q-td class="text-left">{{ columnTotals.gross.toLocaleString() }}</q-td>
          <q-td class="text-left">{{ columnTotals.expenses.toLocaleString() }}</q-td>
          <q-td class="text-left">{{ columnTotals.utilities.toLocaleString() }}</q-td>
          <q-td class="text-left">{{ columnTotals.rent.toLocaleString() }}</q-td>
          <q-td class="text-left text-primary">
            {{ columnTotals.net.toLocaleString() }}
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="row justify-end q-mt-md">
      <q-btn
        color="primary"
        icon-right="archive"
        label="Export to CSV"
        no-caps
        @click="exportTable"
        :disable="rows.length === 0"
      />
    </div>
  </q-card-section>
</template>
