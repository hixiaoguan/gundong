# gundong
js常见联系滚动效果
 * @para obj 目标对象 如:demo,deml1,demo2 中的"demo" 可任意，只要不重复
 *
 * @para speed 滚动速度 越大越慢
 *
 * @para direction 滚动方向 包括:left,right,down,up
 *
 * @para objWidth 总可见区域宽度
 *
 * @para objHeight 总可见区域高度
 * 
 * @para filePath 存放滚动图片的路径 (如果是自动获取文件夹里的图片滚动)
 *
 * @para contentById 对某id为contentById下的内容进行滚动 此滚动与filePath不能共存请注意
 *
 * @para 用法实例 scrollObject("res",50,"up",470,200,"","resource") 对contentById(resource)下内容进行滚动
 *
 * @para 用法实例 scrollObject("res",50,"up",470,200,"d:\\images\\","") 对filePath(images)下内容自动获取并进行滚动,目前只支持ie
