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

  async deleteById(category, id) {
    // delete from local cache
    const cacheData = JSON.parse(localStorage.getItem('data'));
    const filteredData = cacheData.filter((ele) => ele.id !== id);
    localStorage.setItem('data', JSON.stringify(filteredData));
    // call backend server to make change to DB
    await axios.delete(`${baseUrl}/${category}/${id}`);
  },

  async put(params) {
    // change local cache
    const cacheData = JSON.parse(localStorage.getItem('data'));
    const ts = new Date().getTime().toString();
    cacheData.push({
      category: params.category,
      id: params.id || ts,
      data: params.data,
      image_url: params.image_url
    });
    localStorage.setItem('data', JSON.stringify(cacheData));
    // call backend server to make change to DB
    await axios.put(`${baseUrl}/${params.category}`, {
      category: params.category,
      id: params.id || ts,
      data: params.data,
      image_url: params.image_url
    });
  },

  async update(params) {
    // Update local cache
    const cacheData = JSON.parse(localStorage.getItem('data'));
    const filteredData = cacheData.filter((ele) => ele.id !== params.id);
    filteredData.push({
      category: params.category,
      id: params.id,
      data: params.data,
      image_url: params.image_url
    });
    localStorage.setItem('data', JSON.stringify(filteredData));
    // call backend server to make change to DB
    await axios.put(`${baseUrl}/${params.category}`, {
      category: params.category,
      id: params.id || ts,
      data: params.data,
      image_url: params.image_url
    });
  }
};
