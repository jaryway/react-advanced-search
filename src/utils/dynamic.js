import React from "react";
import Loadable from "react-loadable";
// import PropTypes from "prop-types";
// import { combineReducers } from "redux";
import { ReactReduxContext } from "react-redux";

function counter1(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

function withStore(WrappedComponent, { _ref, ...rest }, models) {
  return class extends React.Component {
    static contextType = ReactReduxContext;
    render() {
      const { store } = this.context;
      // console.log("_store:sss", store);

      console.log(
        "ReactReduxContext.Consumer",
        store.getState(),
        store.replaceReducer(counter1)
      );
      /*
      const { cachedList } = store;
      // 找到未缓存的 models 并加载
      const uncachedList = models
        .filter(m => !cachedList.includes(m))
        .filter((m, i) => models.indexOf(m) === i) // 去掉重复的项
        .map(m => import(`@/models/${m}`));

      const reducerList = await Promise.all(uncachedList);

      reducerList
        .map(m => m.default)
        .forEach(({ namespace, reducers }) => {
          store.cachedList.push(namespace);
          store.injectReducers[namespace] = reducers;
        });

      store.replaceReducer(combineReducers(store.injectReducers));
      */

      return <WrappedComponent ref={_ref} {...rest} />;
      /*
      return (
        <ReactReduxContext.Consumer>
          {({ store }) => {
            console.log(
              "ReactReduxContext.Consumer",
              store.getState(),
              store.replaceReducer(counter1)
            );
            
            const { cachedList } = store;
            // 找到未缓存的 models 并加载
            const uncachedList = models
              .filter(m => !cachedList.includes(m))
              .filter((m, i) => models.indexOf(m) === i) // 去掉重复的项
              .map(m => import(`@/models/${m}`));

            const reducerList = await Promise.all(uncachedList);

            reducerList
              .map(m => m.default)
              .forEach(({ namespace, reducers }) => {
                store.cachedList.push(namespace);
                store.injectReducers[namespace] = reducers;
              });

            store.replaceReducer(combineReducers(store.injectReducers));
            

            return <WrappedComponent ref={_ref} {...rest} />;
          }}
        </ReactReduxContext.Consumer>
      );*/
      // return <div>asdfklasj dfakljsdjlaskldfjasl;dkfj aslkdfj </div>;
    }
  };
}

// import Loading from "./Loading";
/* react-loadable 配置参数
// 更多信息，访问： https://github.com/jamiebuilds/react-loadable#optsrender
*/
/**
 *
 * @param {Function} component 需要异步加载的组件 ()=>import('path/to/component')
 * @param {any} options
 */
export default (component, ...rest) => {
  const loader = typeof component === "object" ? component.loader : component;
  const models = ["app"];
  const options = rest.length > 2 ? rest[2] : rest[1];

  const DynamicComponent = Loadable({
    loading: () => <div>loading</div>,
    loader: async () => {
      const { default: LoadableComponent } = await loader();
      // return withStore(LoadableComponent,{_ref,...props})
      // /* ****开始加载组件时再去判断当前加载的reducer是否缓存过**** */
      /**
      
      // 找到没有缓存过的 reducer;
      const uncachedList = reducerPaths.filter(m => !store.cachedList.includes(m));
      const resolveReducers = uncachedList.map(m => import(`@/models/${m}`));
      // console.log('store.cachedList', store.cachedList, uncachedList)
      // 第一个是组件，从第二个开始是 reducer;
      const values = await Promise.all([asyncComponent(), ...resolveReducers]);

      const [{ default: LoadableComponent }] = values;

      if (values.length > 1) {
        values.slice(1)
          .map(m => m.default)
          .forEach(({ namespace, reducers }) => {
            store.asyncReducers[namespace] = reducers;
          });

        // 更新缓存
        store.cachedList.push(...uncachedList);
        // 如果一个页面同时加载两个相同的 reducer 还是会出现相同的key
        store.cachedList = store.cachedList.filter((m, i, arr) => (arr.findIndex(n => n === m) === i));
        console.log('store.asyncReducers', store.asyncReducers, store.cachedList);
        //
        store.replaceReducer(combineReducers(store.asyncReducers));
      }
      // console.log('store.asyncReducers', store.asyncReducers, resolveReducers);
      // console.log('LoadableComponent', LoadableComponent);
      // 解决 ref 的时候 ref 指向 Loadable 组件，而不是指向真正的组件的问题
       
       */
      return props => {
        const WithStoreComponent = withStore(LoadableComponent, props, models);
        return <WithStoreComponent />;
      };
    },

    // timeout: 10000, // 加载模块的过期时间
    // delay: 300,  // 加载延时
    ...options
  });

  return DynamicComponent;
};
