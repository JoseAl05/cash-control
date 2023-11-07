interface Years {
  label: string;
  value: string;
}

export const months = [
  {
    value: '1',
    label: 'Enero',
  },
  {
    value: '2',
    label: 'Febrero',
  },
  {
    value: '3',
    label: 'Marzo',
  },
  {
    value: '4',
    label: 'Abril',
  },
  {
    value: '5',
    label: 'Mayo',
  },
  {
    value: '6',
    label: 'Junio',
  },
  {
    value: '7',
    label: 'Julio',
  },
  {
    value: '8',
    label: 'Agosto',
  },
  {
    value: '9',
    label: 'Septiembre',
  },
  {
    value: '10',
    label: 'Octubre',
  },
  {
    value: '11',
    label: 'Noviembre',
  },
  {
    value: '12',
    label: 'Diciembre',
  },
];

const years: Years[] = [];

for (let year = 2023; year <= 2030; year++) {
  years.push({
    value: year.toString(),
    label: year.toString(),
  });
}

export { years };

export const incomeTypes = [
  {
    value: 'Sueldo',
    label: 'Sueldo',
  },
  {
    value: 'Boleta',
    label: 'Boleta',
  },
  {
    value: 'Devolución',
    label: 'Devolución',
  },
  {
    value: 'Regalo',
    label: 'Regalo',
  },
  {
    value: 'Otro',
    label: 'Otro',
  },
];
