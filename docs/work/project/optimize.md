# 项目过程优化

## 最小化JS文件

可以通过webpack处理打包的JavaScript文件，让其更加的精简。在配置中，你可以这么做

```js
config.optimization.minimize(true);
```

## 图片资源压缩

可以通过 image-webpack-loader 插件对打包的图片进行压缩，看起来会对图片的加载有一些提升。如果担心破坏图片，可以放弃使用它。

```shell
$ yarn add  image-webpack-loader
```

```js
config.module
  .rule('images')
  .use('image-webpack-loader')
  .loader('image-webpack-loader')
  .options({
    bypassOnDebug: true
  })
  .end()
```

## 打包公共代码

在 webpack4 中，可以通过 optimization.minimize 将公共代码进行打包，虽然我个人认为这个东西对SPA应用来说，效果其实有限，但有胜于无，文字再小也是肉不是，所以说，在细节的把控上，永远是无止境的。但是在webpack4中也是将CommonsChunkPlugin 改用 SplitChunksPlugin 了。感觉评论掘友的提醒。

```js
new webpack.optimize.CommonsChunkPlugin({
  name: ['vendor','runtime'],
  filename: '[xxxxx].js'
})
```

## 删除沉淀代码

使用 Tree-Shaking 插件可以将一些无用的沉淀泥沙代码给清理掉。

## 依赖库CDN加速

看到有小伙伴使用CDN的方式引入一些依赖包，觉得非常的 Nice ，然后我也开始使用了。我将 Vue Axios Echarts 等等都分离了出来，在正式环境下，通过CDN，确实有了一些明显的提升，所以说大家可以进行尝试。

```js
// 在html引入script标签后。在vue的配置中，进行声明

configureWebpack: {
  externals: {
    'echarts': 'echarts' // 配置使用CDN
  }
}
```

## GZIP

这个东西需要后端进行配置，当然，如果你有操作 Nginx 的权限的话，那么可以自己开启，反正我认为，这个东西提升还是很大的。具体的可以看这篇文章。这里不过多赘述这个东西。
Vue CLI 2&3 下的项目优化实践 —— CDN + Gzip + Prerender
