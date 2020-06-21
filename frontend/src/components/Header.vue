<template>
  <header class="header">
    <Menu mode="horizontal" :theme="'dark' || 'primary'" active-name="1">
      <MenuItem name="1">
        <router-link to="/">
          <Icon type="ios-paper" />新闻中心
        </router-link>
      </MenuItem>
      <MenuItem name="2">
        <router-link to="/about">
          <Icon type="ios-people" />关于我们
        </router-link>
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />统计分析
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
        </MenuGroup>
      </Submenu>
      <MenuItem name="4">
        <Icon type="ios-construct" />综合设置
      </MenuItem>
    </Menu>
    <Dropdown trigger="click" style="margin-left: 20px" placement="bottom-end">
      <button class="setup-btn">
        <Icon type="md-settings" />
      </button>
      <DropdownMenu slot="list">
        <DropdownItem>
          <Icon type="md-contact" />用户管理
        </DropdownItem>
        <DropdownItem>
          <Icon type="ios-shirt" />换肤
        </DropdownItem>
        <DropdownItem>
          <Icon type="md-options" />模式
          <i-switch size="small" true-color="#13ce66" false-color="#ff4949">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </DropdownItem>
        <DropdownItem disabled>
          <Icon type="md-share" />分享本站
        </DropdownItem>
        <DropdownItem divided>
          <Icon type="md-power" />退出登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background: #515a6e;
  .ivu-menu {
    .ivu-menu-item {
      a {
        display: block;
        color: white;
        font-size: 15px;
        i{
           font-size: 16px;
        }
      }
      a.router-link-exact-active {
        color: #42b983;
        font-weight: 500;
      }
    }
  }
  .ivu-dropdown {
    text-align: left;
    .setup-btn {
      padding: 10px;
      background: none;
      border: none;
      color: #2d8cf0;
      outline: none;
      cursor: pointer;
      i {
        font-size: 24px;
      }
    }
    i {
      padding-right: 5px;
      font-size: 16px;
    }
  }
}
</style>