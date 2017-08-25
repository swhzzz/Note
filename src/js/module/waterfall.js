let WaterFall=(function(){
    let $ct;
    function render($c){
        //初始化
        $ct=$c;
        let $items=$ct.children();
        let itemsWidth=$items.outerWidth(true);
        let windowWidth=$(window).width();
        let cols=Math.floor(windowWidth/itemsWidth);
        let colsHeightArr=[];
        for(let i =0 ;i<cols;i++) colsHeightArr.push(0) //初始化高度数组

        for(let i=0;i<$items.length;i++){//遍历所有note
            let minHeight = Math.min.apply(this,colsHeightArr);//获取最小高度
            let minHeightPos = colsHeightArr.indexOf(minHeight);//获取最小高度下标
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