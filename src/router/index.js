import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuc from '@/views/OrderSuc'
import AboutUs from '@/views/AboutUs'
import GoodsDetails from '@/views/GoodsDetails'
import User from '@/views/User/User'
import OrderList from '@/views/User/Children/OrderList'
import EditArticle from '@/views/User/Children/EditArticle'
import Information from '@/views/User/Children/Information'
import MySale from '@/views/User/Children/Mysale'
import MyCollect from '@/views/User/Children/MyCollect'
import MyArticle from '@/views/User/Children/MyArticle'
import MsgBox from '@/views/User/Children/MsgBox'
import MsgBoxOth from '@/views/User/Children/MsgBoxOth'
import MyLeaveWord from '@/views/User/Children/MyLeaveWord'
import EditSale from '@/views/User/Children/EditSale'
import GoodsSearchList from '@/views/GoodsSearchList'
import GoodsPublish from '@/views/GoodsPublish'
import EvaluationPublish from '@/views/EvaluationPublish'
import ArticleList from '@/views/ArticleList'
import ChatPlace from '@/views/ChatPlace'
import ArticleDetail from '@/views/ArticleDetail'
import AdminLogin from '@/views/Admin/Login.vue'
import Admin from '@/views/Admin/AdminControl'
import CheckList from '@/views/Admin/components/CheckList'
import EditArticleList from '@/views/Admin/components/EditArticle'
import EditAr from '@/views/Admin/components/EditAr'
import InfoSetting from '@/views/Admin/components/InfoSetting'
import AdminLists from '@/views/Admin/components/AdminLists'
import GoodsCheckList from '@/views/Admin/components/goodsCheckList'
import GoodsListEdit from '@/views/Admin/components/goodsListEdit'
import EditGoSingle from '@/views/Admin/components/EditGoSingle'
import PublishArticle from '@/views/Admin/components/PublishArticle'
import Test from '@/views/test/test'
import A from '@/views/test/a'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuc',
      name: 'OrderSuc',
      component: OrderSuc
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/goodsDetails',
      name: 'GoodsGetDetails',
      component: GoodsDetails
    },
    {
      path: '/goodsSearchList',
      name: 'GoodsSearchList',
      component: GoodsSearchList
    },
    {
      path: '/goodsPublish',
      name: 'GoodsPublish',
      component: GoodsPublish
    },
    {
      path: '/evaluationPublish',
      name: 'EvaluationPublish',
      component: EvaluationPublish
    },
    {
      path: '/article',
      name: 'Article',
      component: ArticleList
    },
    {
      path: '/page/:page',
      component: ArticleList
    },
    {
      path: '/article/:id',
      component: ArticleDetail
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      children: [
        {
          path: 'orderList',
          name: 'OrderList',
          component: OrderList
        },
        {
          path: 'information',
          name: 'Information',
          component: Information
        },
        {
          path: 'mySale',
          name: 'Mysale',
          component: MySale
        },
        {
          path: 'myCollect',
          name: 'MyCollect',
          component: MyCollect
        },
        {
          path: 'myArticle',
          name: 'MyArticle',
          component: MyArticle
        },
        {
          path: 'myLeaveWord',
          name: 'MyLeaveWord',
          component: MyLeaveWord
        },
        {
          path: 'replyMsg/:msgId',
          name: 'ReplyMsg',
          component: MsgBox
        },
        {
          path: 'replyMsgOth/:msgId',
          name: 'ReplyMsgOth',
          component: MsgBoxOth
        }
      ]
    },
    {
      path: '/chatPlace',
      name: 'ChatPlace',
      component: ChatPlace
    },
    {
      path: '/editArticle',
      name: 'EditArticle',
      component: EditArticle
    },
    {
      path: '/editSale',
      name: 'EditSale',
      component: EditSale
    },
    {
      path: '/adminLogin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: Admin,
      component: Admin,
      meta: { authPage: true },
      children: [
        {
          path: 'checkList',
          component: CheckList
        },
        {
          path: 'editArticle',
          component: EditArticleList
        },
        {
          path: 'infoSetting',
          component: InfoSetting
        },
        {
          path: 'adminLists',
          component: AdminLists
        },
        {
          path: 'editAr',
          component: EditAr
        },
        {
          path: 'goodsCheckLIst',
          component: GoodsCheckList
        },
        {
          path: 'editGoods',
          component: GoodsListEdit
        },
        {
          path: 'editGoSingle',
          component: EditGoSingle
        },
        {
          path: 'publishArticle',
          component: PublishArticle
        }
      ],
      redirect: '/admin/checkList'
    },
    {
      path: '/test',
      component: Test,
      children: [
        {
          path: 'a',
          name: 'a',
          component: A
        }
      ]
    }
  ]
})
