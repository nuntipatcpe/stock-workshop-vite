- typescript

# VS code extention

```
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension vscode-icons-team.vscode-icons
code --install-extension naumovs.color-highlight
code --install-extension esbenp.prettier-vscode
code --install-extension humao.rest-client
code --install-extension riazxrazor.html-to-jsx
code --install-extension christian-kohler.path-intellisense
code --install-extension alexcvzz.vscode-sqlite
```

# Mui

```
npm install @mui/material @emotion/react @emotion/styled
```

hotkey

- control + spacbar

Unit

- 1point = 8px

Link

```
const MyNavLink = React.forwardRef<any, any>((props, ref) => (
  <NavLink
    ref={ref}
    to={props.to}
    className={({ isActive }) =>
      `${props.className} ${isActive ? props.activeClassName : ""}`
    }
  >
    {props.children}
  </NavLink>
));

```

```
<ListItemButton
            disablePadding
            component={MyNavLink}
            to="/stock"
            activeClassName="Mui-selected"
            exact
          >
          </ListItemButton>
```

# Dependencies :

- @emotion/react 11.10.0
- @emotion/styled 11.10.0
- @mui/material 5.10.1
- @mui/icons-material 5.8.4
- @mui/x-data-grid 5.15.3
- @react-hook/debounce 4.0.0
- @types/react-router-dom 5.3.3
- @types/redux-logger 3.0.9
- @types/url-join 4.0.1
- axios 0.27.2
- chart.js 3.9.1
- formik 2.2.9
- formik-material-ui 4.0.0-alpha.2 deprecated
- moment 2.29.4
- react-chartjs-2 4.3.1
- react-iframe 1.8.0
- react-moment 1.1.2
- react-number-format 4.9.3
- react-redux 8.0.2
- react-router-dom 6.3.0
- redux 4.2.0
- redux-logger 3.0.6
- redux-thunk 2.4.1
- url-join 5.0.0

```
pnpm i @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid chart.js react-chartjs-2 @react-hook/debounce react-router-dom @types/react-router-dom axios formik formik-material-ui moment react-moment url-join react-number-format @types/redux-logger react-redux redux redux-logger redux-thunk url-join @types/url-join react-iframe
```

- create-react-component-folder ^0.3.7 **NPX only**

  ```
  pnpm i -D create-react-component-folder
  ```

  cd src/components/pages

  ```
  npx crcf -f --notest --typescript LoginPage RegisterPage ReportPage StockPage StockCreatePage StockEditPage AboutUs
  ```

  cd src/components/layouts

  ```
  npx crcf -f --notest --typescript Header Menu
  ```

# Axios

- Custom axios interceptors [Ref.](https://blog.clairvoyantsoft.com/intercepting-requests-responses-using-axios-df498b6cab62)

  Axios create

  ```
  const customAxios = axios.create({
    baseURL: `https://example.com/api`,
    timeout: 10000,
    headers: { 'api-key': 'eyJz-CI6Ikp-4pWY-lhdCI6' }
  });
  ```

  Request

  ```
  customAxios.interceptors.request.use(async (config: any) => {
    return config;
  });
  ```

  Response

  ```
  customAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(JSON.stringify(error, undefined, 2));
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      } else if (!error.response) {
        return Promise.reject({
          code: "NOT_CONNECT_NETWORK",
          message: "Cannot connect to server, Please try again.",
        });
      }
      return Promise.reject(error);
    }
  );

  ```

  ```
  export default httpClient;
  ```

- Axios interceptors

  Request

  ```
  axios.interceptors.request.use(async (config: any) => {
    return config;
  });
  ```

  Response

  ```
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(JSON.stringify(error, undefined, 2));
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      } else if (!error.response) {
        return Promise.reject({
          code: "NOT_CONNECT_NETWORK",
          message: "Cannot connect to server, Please try again.",
        });
      }
      return Promise.reject(error);
    }
  );
  ```

  ```
  export const httpClient = axios;
  ```

  regex = /^(?:\w+;)\/\//; return boolean

  regex.test(config.url);

  ```
  const inAbsoluteURLRegex = /^(?:\w+;)\/\//;

  httpClient.interceptors.request.use(async (config: any) => {
  //Get by -> authen/login
  if (!inAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }
  //Or full url -> http://localhost:8085/api/v2/authen/login
  return config;
  });
  ```
