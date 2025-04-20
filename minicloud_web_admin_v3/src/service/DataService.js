import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

export const DataService = {
  async getData() {
    if (localStorage.getItem('data')) {
      return JSON.parse(localStorage.getItem('data'));
    }
    const cleanedData = await this.reload();
    return cleanedData;
  },

  async reload() {
    const res = await axios.get(`${baseUrl}`);
    const data = res['data'];
    localStorage.setItem('data', JSON.stringify(data));
    return;
  },

  async getAll() {
    return Promise.resolve(this.getData());
  },

  async getByCategory(cat) {
    const data = await this.getData();
    const filteredData = data.filter((ele) => ele.category == cat);
    return filteredData;
  },

  async findByCategory(cat) {
    const data = await this.getData();
    const targetData = data.find((ele) => ele.category == cat);
    return targetData;
  },

  async findById(id) {
    const data = await this.getData();
    const targetData = data.find((ele) => ele.id == id);
    return targetData;
  },

  async put(data) {}
};
