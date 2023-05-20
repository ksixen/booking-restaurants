import type { IOrder } from "./components/OrdersList/ordersSlice";

type useRequestType = <T>(
  method: string,
  path: string,
  params?: unknown
) => Promise<T>;

class API {
  static getURI() {
    return "http://localhost:3030/";
  }

  useRequest<T>(method: string, path = "", params?: unknown): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `${API.getURI()}${path}`;
      xhr.open(method, url);
      xhr.onload = () => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = () => reject(xhr.responseText);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      console.log(JSON.stringify(params));
      if (params) xhr.send(JSON.stringify(params));
      else xhr.send();
    });
  }

  user() {
    return new UserAPI(this);
  }
  booking() {
    return new BookingAPI(this);
  }
}
class UserAPI {
  #request: useRequestType;
  constructor(arg: API) {
    this.#request = arg.useRequest;
  }
  login(props: { username: string; password: string }) {
    return this.#request<{ response: boolean }>("POST", "log", props);
  }
  register(props: { username: string; password: string }) {
    return this.#request<{ response: boolean }>("POST", "reg", props);
  }
}
class BookingAPI {
  #request: useRequestType;
  constructor(arg: API) {
    this.#request = arg.useRequest;
  }
  getList(props: { username: string }) {
    return this.#request<{
      response: IOrder[];
    }>("POST", "usersOrders", props);
  }
  getDayOrders(props: { day: string }) {
    return this.#request<{
      response: IOrder[];
    }>("POST", "dayOrder", props);
  }
  order(props: IOrder) {
    return this.#request<{
      response: true;
    }>("POST", "order", props);
  }
  cancelOrder(props: { username: string; day: string; time: string }) {
    return this.#request<{
      response: true;
    }>("POST", "cancelOrder", props);
  }
}
export default API;
