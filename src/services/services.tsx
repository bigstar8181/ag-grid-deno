import axios from 'axios';

type DataType = {
  contents: any;
};

const tradesURL = 'https://api.myjson.com/bins/lb5wu';
const manufacturesURL = 'https://api.myjson.com/bins/17obfz';
const parts = 'https://api.myjson.com/bins/ms03z';

const PostService = {
  async getAllCars() {
    const cars = JSON.parse(localStorage.getItem('cars'));
    if (cars) {
      const validationErrorsServer = [
        { message: ' model validated', field: 'P/R' },
        { message: ' release no validated', field: 'release' }
      ];
      const validationErrors = validationErrorsServer.reduce(function(
        result,
        item
      ) {
        var key = item.field;
        result[key] = { ...item, isEdited: false };
        return result;
      },
      {});

      return cars.map((car, index) => {
        if (index === 1) {
          return {
            ...car,
            isNoValidated: true,
            validationErrors
          };
        }
        return car;
      });
    }

    const { data } = await axios.get(tradesURL);
    const { contents } = data as DataType;
    const contentsWithDate = contents.map((content, index) => ({
      ...content,
      date: new Date(new Date().getTime() + 3600 * 1000 * index).toISOString()
    }));
    localStorage.setItem('cars', JSON.stringify(contentsWithDate));
    return contentsWithDate;
  },

  async getCarManufactures() {
    const { data } = await axios.get(manufacturesURL);
    const { contents } = data as DataType;
    return contents;
  },

  async getCarPartsByManufacture() {
    const { data } = await axios.get(parts);
    return data;
  }
};

export default PostService;
