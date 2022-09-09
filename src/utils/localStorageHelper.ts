class LocalStorageHelper<R> {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): R | undefined {
    const storageItem = localStorage.getItem(this.key);
    try {
      if (storageItem) {
        return JSON.parse(storageItem) as R
      }
    } catch (err) {
      console.error(`Get ${this.key} from localStorage failed with`, err)
    }
  }

  set(item: R) {
    try {
      const itemInJson = JSON.stringify(item);
      localStorage.setItem(this.key, itemInJson)
    } catch (err) {
      console.error(`Set item is not serializable - with key${this.key}`, err)
    }
  }

  remove() {
    localStorage.removeItem(this.key)
  }
}


const tokenHelper = new LocalStorageHelper<string>('token')

export { tokenHelper }