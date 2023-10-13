const navigation = () => {
  return [
    {
      icon: 'mdi:home-outline',
      title: 'Dashboards',
      path: '/dashboards/ecommerce'
    },
    {
      title: 'Category',
      icon: 'mdi:shape-outline',
      path: '/category'
    },
    {
      title: 'Brand',
      icon: 'mdi-watermark',
      path: '/brands'
    },
    {
      icon: 'mdi:shopping-outline',
      title: 'Products',
      path: '/products'
    },
    {
      icon: 'mdi-cart-outline',
      title: 'Orders',
      path: '/orders'
    },
    {
      icon: 'mdi-view-carousel',
      title: 'Banner Settings',
      path: '/banner-settings'
    },
    {
      icon: 'mdi-post',
      title: 'Blogs',
      path: '/blogs'
    },
  ]
}

export default navigation
