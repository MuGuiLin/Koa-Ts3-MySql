export default store => {
    // 在store初始化的时候，将存储在localStorage中的状态还原
    if (localStorage) {

        const user = JSON.parse(localStorage.getItem('user-info'));
        if (user) {
            store.commit('user/selectUserInfo', user);
        }
    };

    // 订阅监听store中各个模块的mutations中的状态发生变化时
    store.subscribe((mutation, state) => {

        console.log(mutation, state.user.userinfo);

        if ('user/updateUserInfo' === mutation.type) {
            // 通过user/updateUserInfo更新状态，将状态存入localStorage中

            localStorage.setItem('user-info', JSON.stringify(state.user.userinfo));
        }
    });
};