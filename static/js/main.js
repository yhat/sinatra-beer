/**** DROPDOWNS ***/
(function(d){function e(){this.isField=!0;this.keyboardMode=this.hasLabel=this.cutOff=this.disabled=this.inFocus=this.down=!1;this.nativeTouch=!0;this.wrapperClass="dropdown";this.onChange=null}e.prototype={constructor:e,instances:[],init:function(a,c){var b=this;d.extend(b,c);b.$select=d(a);b.id=a.id;b.options=[];b.$options=b.$select.find("option");b.isTouch="ontouchend"in document;b.$select.removeClass(b.wrapperClass+" dropdown");b.$select.is(":disabled")&&(b.disabled=!0);b.$options.length&&(b.$options.each(function(a){var c=
d(this);c.is(":selected")&&(b.selected={index:a,title:c.text()},b.focusIndex=a);c.hasClass("label")&&0==a?(b.hasLabel=!0,b.label=c.text(),c.attr("value","")):b.options.push({domNode:c[0],title:c.text(),value:c.val(),selected:c.is(":selected")})}),b.selected||(b.selected={index:0,title:b.$options.eq(0).text()},b.focusIndex=0),b.render())},render:function(){var a=this;a.$container=a.$select.wrap('<div class="'+a.wrapperClass+(a.isTouch&&a.nativeTouch?" touch":"")+(a.disabled?" disabled":"")+'"><span class="old"/></div>').parent().parent();
a.$active=d('<span class="selected">'+a.selected.title+"</span>").appendTo(a.$container);a.$carat=d('<span class="carat"/>').appendTo(a.$container);a.$scrollWrapper=d("<div><ul/></div>").appendTo(a.$container);a.$dropDown=a.$scrollWrapper.find("ul");a.$form=a.$container.closest("form");d.each(a.options,function(){a.$dropDown.append("<li"+(this.selected?' class="active"':"")+">"+this.title+"</li>")});a.$items=a.$dropDown.find("li");a.maxHeight=0;a.cutOff&&a.$items.length>a.cutOff&&a.$container.addClass("scrollable");
for(i=0;i<a.$items.length;i++){var c=a.$items.eq(i);a.maxHeight+=c.outerHeight();if(a.cutOff==i+1)break}a.isTouch&&a.nativeTouch?a.bindTouchHandlers():a.bindHandlers()},bindTouchHandlers:function(){var a=this;a.$container.on("click.easyDropDown",function(){a.$select.focus()});a.$select.on({change:function(){var c=d(this).find("option:selected"),b=c.text(),c=c.val();a.$active.text(b);"function"===typeof a.onChange&&a.onChange.call(a.$select[0],{title:b,value:c})},focus:function(){a.$container.addClass("focus")},
blur:function(){a.$container.removeClass("focus")}})},bindHandlers:function(){var a=this;a.query="";a.$container.on({"click.easyDropDown":function(){a.down||a.disabled?a.close():a.open()},"mousemove.easyDropDown":function(){a.keyboardMode&&(a.keyboardMode=!1)}});d("body").on("click.easyDropDown."+a.id,function(c){c=d(c.target);var b=a.wrapperClass.split(" ").join(".");!c.closest("."+b).length&&a.down&&a.close()});a.$items.on({"click.easyDropDown":function(){var c=d(this).index();a.select(c);a.$select.focus()},
"mouseover.easyDropDown":function(){if(!a.keyboardMode){var c=d(this);c.addClass("focus").siblings().removeClass("focus");a.focusIndex=c.index()}},"mouseout.easyDropDown":function(){a.keyboardMode||d(this).removeClass("focus")}});a.$select.on({"focus.easyDropDown":function(){a.$container.addClass("focus");a.inFocus=!0},"blur.easyDropDown":function(){a.$container.removeClass("focus");a.inFocus=!1},"keydown.easyDropDown":function(c){if(a.inFocus){a.keyboardMode=!0;var b=c.keyCode;if(38==b||40==b||32==
b)c.preventDefault(),38==b?(a.focusIndex--,a.focusIndex=0>a.focusIndex?a.$items.length-1:a.focusIndex):40==b&&(a.focusIndex++,a.focusIndex=a.focusIndex>a.$items.length-1?0:a.focusIndex),a.down||a.open(),a.$items.removeClass("focus").eq(a.focusIndex).addClass("focus"),a.cutOff&&a.scrollToView(),a.query="";if(a.down)if(9==b||27==b)a.close();else{if(13==b)return c.preventDefault(),a.select(a.focusIndex),a.close(),!1;if(8==b)return c.preventDefault(),a.query=a.query.slice(0,-1),a.search(),clearTimeout(a.resetQuery),
!1;38!=b&&40!=b&&(c=String.fromCharCode(b),a.query+=c,a.search(),clearTimeout(a.resetQuery))}}},"keyup.easyDropDown":function(){a.resetQuery=setTimeout(function(){a.query=""},1200)}});a.$dropDown.on("scroll.easyDropDown",function(c){a.$dropDown[0].scrollTop>=a.$dropDown[0].scrollHeight-a.maxHeight?a.$container.addClass("bottom"):a.$container.removeClass("bottom")});if(a.$form.length)a.$form.on("reset.easyDropDown",function(){a.$active.text(a.hasLabel?a.label:a.options[0].title)})},unbindHandlers:function(){this.$container.add(this.$select).add(this.$items).add(this.$form).add(this.$dropDown).off(".easyDropDown");
d("body").off("."+this.id)},open:function(){var a=window.scrollY||document.documentElement.scrollTop,c=window.scrollX||document.documentElement.scrollLeft,b=this.notInViewport(a);this.closeAll();this.$select.focus();window.scrollTo(c,a+b);this.$container.addClass("open");this.$scrollWrapper.css("height",this.maxHeight+"px");this.down=!0},close:function(){this.$container.removeClass("open");this.$scrollWrapper.css("height","0px");this.focusIndex=this.selected.index;this.query="";this.down=!1},closeAll:function(){var a=
Object.getPrototypeOf(this).instances,c;for(c in a)a[c].close()},select:function(a){"string"===typeof a&&(a=this.$select.find("option[value="+a+"]").index()-1);var c=this.options[a],b=this.hasLabel?a+1:a;this.$items.removeClass("active").eq(a).addClass("active");this.$active.text(c.title);this.$select.find("option").removeAttr("selected").eq(b).prop("selected",!0).parent().trigger("change");this.selected={index:a,title:c.title};this.focusIndex=i;"function"===typeof this.onChange&&this.onChange.call(this.$select[0],
{title:c.title,value:c.value})},search:function(){var a=this,c=function(b){a.focusIndex=b;a.$items.removeClass("focus").eq(a.focusIndex).addClass("focus");a.scrollToView()};for(i=0;i<a.options.length;i++){var b=a.options[i].title.toUpperCase();if(0==b.indexOf(a.query)){c(i);return}}for(i=0;i<a.options.length;i++)if(b=a.options[i].title.toUpperCase(),-1<b.indexOf(a.query)){c(i);break}},scrollToView:function(){if(this.focusIndex>=this.cutOff){var a=this.$items.eq(this.focusIndex).outerHeight()*(this.focusIndex+
1)-this.maxHeight;this.$dropDown.scrollTop(a)}},notInViewport:function(a){var c=a+(window.innerHeight||document.documentElement.clientHeight),b=this.$dropDown.offset().top+this.maxHeight;return b>=a&&b<=c?0:b-c+5},destroy:function(){this.unbindHandlers();this.$select.unwrap().siblings().remove();this.$select.unwrap();delete Object.getPrototypeOf(this).instances[this.$select[0].id]},disable:function(){this.disabled=!0;this.$container.addClass("disabled");this.$select.attr("disabled",!0);this.down||
this.close()},enable:function(){this.disabled=!1;this.$container.removeClass("disabled");this.$select.attr("disabled",!1)}};var f=function(a,c){a.id=a.id?a.id:"EasyDropDown"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6).toUpperCase();var b=new e;b.instances[a.id]||(b.instances[a.id]=b,b.init(a,c))};d.fn.easyDropDown=function(){var a=arguments,c=[],b;b=this.each(function(){if(a&&"string"===typeof a[0]){var b=e.prototype.instances[this.id][a[0]](a[1],a[2]);b&&c.push(b)}else f(this,a[0])});
return c.length?1<c.length?c:c[0]:b};d(function(){"function"!==typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"===typeof"test".__proto__?function(a){return a.__proto__}:function(a){return a.constructor.prototype});d("select.dropdown").each(function(){var a=d(this).attr("data-settings");settings=a?d.parseJSON(a):{};f(this,settings)})})})(jQuery);

var beer_svg='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path id="beer-5-icon" d="M351.809,414.349V195.097c18.994-10.198,31.943-30.25,31.943-53.277c0-32.168-25.268-58.548-56.996-60.336 C313.539,63.063,291.392,50,265.409,50c-16.671,0-33.396,5.523-47.151,16.548c-24.044-7.834-51.414-1.577-69.546,17.89 c-24.427,0.469-45.717,9.044-57.79,30.047c-8.764,15.244-10.05,32.479-10.674,50.272c-1.056,30.092-21.869,31.153-25.674,66.733 c-3.541,33.114,19.759,57.062,48.038,57.062c5.15,0,10.155-0.823,14.87-2.368v128.165c0,11.399-9.242,20.642-20.645,20.642V462 h275.615v-27.01C361.053,434.99,351.809,425.748,351.809,414.349z M102.612,261.497c-11.408,0-23.052-9.214-21.136-27.131 c2.838-26.555,24.403-28.529,25.811-68.661c1.079-30.751,3.766-58.596,54.818-53.664c6.581-12.89,19.979-21.724,35.445-21.724 c10.153,0,19.413,3.81,26.445,10.071c8.486-13.988,23.857-23.333,41.413-23.333c21.55,0,39.804,14.087,46.075,33.554 c3.679-1.396,7.668-2.167,11.837-2.167c18.434,0,33.375,14.942,33.375,33.376c0,18.433-14.941,33.376-33.375,33.376 c-10.755,0-20.313-5.09-26.418-12.987c-20.579,17.656-51.819,15.028-69.101-6.277c-13.646,15.969-37.697,19.688-57.158,3.475 c-6.518-5.429-12.765-7.823-18.526-7.823c-23.844,0-39.304,41.05-30.56,77.772C126.71,250.99,114.795,261.497,102.612,261.497z M148.597,250.9c1.816-8.566,1.621-17.991-0.718-27.812c-2.356-9.895-2.3-21.145,0.152-30.865c1.54-6.099,3.605-10,5.118-12.174 c0.059,0.047,0.117,0.096,0.178,0.146c13.15,10.957,28.555,16.749,44.547,16.749c10.101,0,19.941-2.324,28.85-6.661 c11.542,6.903,24.847,10.645,38.695,10.645c10.093,0,20.014-2.032,29.188-5.886c8.251,4.459,17.522,6.953,27.204,7.188V250.9 H148.597z M372.453,388.951v-37.086c54.162-31.412,66.584-107.752,25.104-107.752h-25.104v-33.958h31.279 C489.269,210.155,469.161,352.398,372.453,388.951z"/></svg>';


var recommendation = {
    init: function(){
        this.beers();

        $("#rec").submit(function(e) {
            e.preventDefault();
            recommendation.submit();
        });
    },
    beers: function(){
        for (var i=0; i < 9; i++){
            $('.visualization').append('<div class="beer" data-id="'+i+'">'+beer_svg+'<span class="name"></span><span class="value"></span></div>'); 
        }
    },
    submit: function(){
        var beer = $("#beer").val();
        var payload = {
            beer: $("#beer").val(),
            weights: [
                parseFloat($("#weight1").val()),
                parseFloat($("#weight2").val()),
                parseFloat($("#weight3").val()),
                parseFloat($("#weight4").val())
            ]
        };

        $.ajax({
            type: "POST",
            url: "/",
            data: JSON.stringify(payload),
            contentType: "application/json",
            success: function(d) {
                recommendation.reset();
                $("#result").show().text(JSON.stringify(d, null, 2));
                if (d.result.length){
                    $('.results p').addClass('show');
                }
                for (var i=0; i < d.result.length; i++){
                    var $this_beer = $('.beer:nth-child('+(i+1)+')');
                    $this_beer.find('.name').html(d.result[i][1]);
                    $this_beer.find('.value').html(d.result[i][2]);  
                    $this_beer.addClass('show');
                }
                
            }
        });
        return false;
    },
    reset: function(){
        $('.results p').removeClass('show');
        $('.beer').removeClass('show');
        $('#result').hide().text('');
    }
};

$(document).ready(function(){
    recommendation.init();
});
