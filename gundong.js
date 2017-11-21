/**
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
 */


var $ = function(id) { return document.getElementById(id) }
// 滚动
function scrollObject(obj, speed, direction, objWidth, objHeight, filePath, contentById)

{
    // 执行初始化
    if (direction == "up" || direction == "down")
        document.write(UDStructure());
    else
        document.write(LRStructure());

    var demo = $(obj);
    var demo1 = $(obj + "1");
    var demo2 = $(obj + "2");
    var speed = speed;

    $(contentById).style.display = "none"

    demo.style.overflow = "hidden";
    demo.style.width = objWidth + "px";
    demo.style.height = objHeight + "px";
    demo.style.margin = "0 auto";

    if (filePath != "")
        demo1.innerHTML = file();

    if (contentById != "")
        demo1.innerHTML = $(contentById).innerHTML;

    demo2.innerHTML = demo1.innerHTML;


    // 左右滚动
    function LRStructure() {
        var _html = "";
        _html += "<div id='" + obj + "' >";
        _html += "<table border='0' align='left' cellpadding='0' cellspacing='0' cellspace='0'>";
        _html += "<tr>";
        _html += "<td nowrap='nowrap' id='" + obj + "1' >";
        // 此处是放要滚动的内容
        _html += "</td>";
        _html += "<td nowrap='nowrap' id='" + obj + "2' ></td>";
        _html += "</tr>";
        _html += "</table>";
        _html += "</div>";

        return _html;
    }


    // 上下滚动的结构
    function UDStructure() {
        var _html = "";
        _html += "<div id=" + obj + " >";
        _html += "<table border='0' align='left' cellpadding='0' cellspacing='0' cellspace='0'>";
        _html += "<tr>";
        _html += "<td id='" + obj + "1' >";
        // 此处是放要滚动的内容
        _html += "</td>";
        _html += "</tr>";
        _html += "<tr>";
        _html += "<td id='" + obj + "2' ></td>";
        _html += "</tr>";
        _html += "</table>";
        _html += "</div>";
        return _html;
    }


    // 取得文件夹下的图片
    function file() {
        var tbsource = filePath; //本地文件夹路径
        filePath = filePath.toString();

        if (filePath == "")
            return "";

        var imgList = "";
        var objFSO = new ActiveXObject('Scripting.FileSystemObject');

        // 文件夹是否存在
        if (!objFSO.FolderExists(tbsource)) {
            alert("<" + tbsource + ">该文件夹路径不存在，或者路径不能含文件名！");
            objFSO = null;
            return;
        }

        var objFolder = objFSO.GetFolder(tbsource);
        var colFiles = new Enumerator(objFolder.Files);
        var re_inf1 = /\.jpg$/; //验证文件夹文件是否jpg文件

        for (; !colFiles.atEnd(); colFiles.moveNext()) //读取文件夹下文件
        {
            var objFile = colFiles.item();

            if (re_inf1.test(objFile.Name.toLowerCase())) {
                imgList += "<img src=" + filePath + "/" + objFile.Name + ">";
            }
        }

        return imgList;
    }

    // 向左滚
    function left() {
        if (demo2.offsetWidth - demo.scrollLeft <= 0) {
            demo.scrollLeft -= demo1.offsetWidth;
        } else {
            demo.scrollLeft++;
        }
    }


    // 向右滚
    function right() {
        if (demo.scrollLeft <= 0) {
            demo.scrollLeft += demo2.offsetWidth;
        } else {
            demo.scrollLeft--
        }
    }


    // 向下滚
    function down() {
        if (demo1.offsetTop - demo.scrollTop >= 0) {
            demo.scrollTop += demo2.offsetHeight;
        } else {
            demo.scrollTop--
        }
    }

    // 向上滚
    function up() {
        if (demo2.offsetTop - demo.scrollTop <= 0) {
            demo.scrollTop -= demo1.offsetHeight;
        } else {
            demo.scrollTop++
        }
    }

    // 切换方向
    function swichDirection() {
        switch (direction) {
            case "left":
                return left();
                break;

            case "right":
                return right();
                break;

            case "up":
                return up();
                break;

            default:
                return down();
        }
    }

    // 重复执行
    var myMarquee = setInterval(swichDirection, speed);

    // 鼠标悬停
    demo.onmouseover = function() { clearInterval(myMarquee); }

    // 重新开始滚动
    demo.onmouseout = function() { myMarquee = setInterval(swichDirection, speed); }
}