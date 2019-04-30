export interface InitOptions {
  store_name: string;
  admin_access_token?: string;
  storefront_access_token?: string;
  client_key?: string;
  client_pass?: string;
  fetch?: Fetch;
  application?: string;
  headers?: Headers;
}

export interface Options {
  host: string;
  fetch?: Fetch;
  application?: string;
  headers?: Headers;
}

export interface Headers {
  [key: string]: string;
}

export interface Fetch {
  (input?: Request | string, init?: RequestInit): Promise<Response>;
}
