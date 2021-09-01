const getParties = {
  Toyota: [
    {
      name: 'model',
      required: 'true',
      enabled: true,
      data: [{ name: 'A', text: 'A' }]
    },
    {
      name: 'price',
      required: 'true',
      enabled: true
    }
  ],
  Ford: [
    {
      name: 'model',
      required: 'false',
      enabled: true
    },
    {
      name: 'price',
      required: 'true',
      enabled: false
    }
  ]
};

export default getParties;
