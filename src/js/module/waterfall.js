var WaterFall=(function(){
    var $ct;
    function render($c){
        //初始化
        $ct=$c;
        var $items=$ct.children();
        var itemsWidth=$items.outerWidth(true);
        var windowWidth=$(window).width();
        var cols=Math.floor(windowWidth/itemsWidth);
        var colsHeightArr=[];
        for(var i =0 ;i<cols;i++) colsHeightArr.push(0) //初始化高度数组

        for(var i=0;i<$items.length;i++){//遍历所有note
            var minHeight = Math.min.apply(this,colsHeightArr);//获取最小高度
            var minHeightPos = colsHeightArr.indexOf(minHeight);//获取最小高度下标
            $items.eq(i).css({//摆放
                left: itemsWidth*minHeightPos,
                top: minHeight
            });
            colsHeightArr[minHeightPos]+=$items.eq(i).outerHeight(true) //摆放完成后增加高度
        }
    }

    $(window).on('resize',()=>{
        render($ct)
    });

    return {
        init: render
    }
})();

module.exports=WaterFall;