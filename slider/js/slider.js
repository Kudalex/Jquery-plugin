;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS для Browserify
		module.exports = factory;
	} else {
		// Global variables browser
		factory(jQuery);
	}
}(function($){
    'use strict';

    class dataSource{

        constructor(defaultData, data){
            
            this._defaultData = defaultData;
            this._data = data;
            this._playDelay = data.playDelay;
            this._playState = data.playState;
            this._lang = data.lang;
            this._beforeOpen = data.beforeOpen;
        }
        
        //Get Default Array of items
        get default(){
            return this._defaultData.items;
        }

        //Get Array of items
        get data(){
            if (this._data && this._data.items){
                return this._data.items;
            } else {
                return this.default;
            }
        }

        //Get count of items
        get length(){
            if (this._data && this._data.items){
                return this.data.length;
            } else {
                return 1;
            }
        }

        //Sort data
        sortData(){
            this.data.sort(function (a, b) {
                return a.sort - b.sort;
            });
        }

        get playDelay(){
            if (!this._playDelay || this._playDelay < 1000){
                this._playDelay = this._defaultData.playDelay;
            }
            return this._playDelay;
        }
        
        get playState(){
            if (!this._playState){
                this._playState = this._defaultData.playState;
            }
            return this._playState;
        }
        
        set lang(value){
            this._lang = value;
        }

        get lang(){
            return this._lang;
        }

        set beforeOpen(value){
            this._beforeOpen = value;
        }

        get beforeOpen(){
            return this._beforeOpen;
        }

    }

    class paginator{

        constructor(dataSource, element){

            this._page = 1;
            this._pages = dataSource.length;

            this.element = $(element);
            this.body = $('body');
        }

        init(){
            this.body.find('.slider-paginator-span--pages')[0].innerHTML = this._pages;
            this.body.find('.slider-paginator-span--page')[0].innerHTML = this._page;
        }

        set pages(value){
            this._pages = value;
            this.body.find('.slider-paginator-span--pages')[0].innerHTML = this._pages;
        }

        get pages(){
            return this._pages;
        }

        set page(value){
            this._page = value;
            this.body.find('.slider-paginator-span--page')[0].innerHTML = this._page;
        }

        get page(){
            return this._page;
        }
    }

    class htmlElements{
        
        constructor(element){

            this.element = $(element);
            this.body = $('body');
        }

        get sender(){
            return this.element[0];
        }

        get image(){
            return this.body.find('.slider-image')[0];
        }

        get description(){
            return this.body.find('.slider-description-text')[0];
        }

        get descriptionContent(){
            return this.body.find('.slider-description-content')[0];
        }

        get title(){
            return this.body.find('.slider-title-span')[0];
        }

        get imageContent(){
            return this.body.find('.slider-image-content')[0];
        }

        get actionsButtonPlay(){
            return this.body.find('.slider-actions--button-play')[0];
        }
        
        get actionsButtonPlayImage(){
            return this.body.find('.slider-actions--button-play-image')[0];
        }

        get downloadImage(){
            return this.body.find('.slider-download-image')[0];
        }

        get arrowNext(){
            return this.body.find('.slider-arrow-next')[0];
        }

        get arrowPrevious(){
            return this.body.find('.slider-arrow-previous')[0]
        }

        get sliderContent(){
            return this.body.find('.slider-content')[0];
        }

        get sliderPaginatorContent(){
            return this.body.find('.slider-paginator-content')[0];
        }

        get closeButton(){
            return this.body.find('.slider-button-close')[0];
        }

        createSlider(){
            this.body[0].classList.add('slider-body');
            this.body.append(`
            <div class = "slider-content slider-element-hide" tabindex="0">
                <div class = "slider-modal-content">
                    <div class = 'slider-image-content'>
                        <img class = 'slider-image' src = ''>
                        <div class = 'slider-description-content slider-element-show'>
                            <!--<div class = 'slider-button-description-close'>
                                <img class = 'slider-button-description-close--image' src = 'slider/img/close-button.png'>
                            </div>-->
                            <span class = 'slider-description-text slider-element-show'></span>
                        </div>
                    </div>
                   
                </div>
                <div class = 'slider-arrow-previous slider-arrow'>
                    <img class = 'slider-arrow-image-previous slider-arrow-image' src = 'slider/img/left-arrow.png'>
                </div>
                <div class = 'slider-arrow-next slider-arrow'>
                    <img class = 'slider-arrow-image-next slider-arrow-image' src = 'slider/img/right-arrow.png'>
                </div>
                <div class = 'slider-button-close'>
                    <img class = 'slider-button-close--image' src = 'slider/img/close-button.png'>
                </div>
                <div class = 'slider-footer'>
                    <div class = 'slider-footer-panel'>
                        <div class = 'slider-actions-content'>

                            <div class = 'slider-actions--button-play slider-actions--button slider-element-show'>
                                <img class = 'slider-actions--button-play-image slider-actions--button-image' src = 'slider/img/play-button.png'>
                            </div>

                            <a class = 'slider-download-image' href="" download>
                                <span class = 'slider-actions--button-download slider-actions--button slider-element-show'>
                                        <img class = 'slider-actions--button-download-image slider-actions--button-image' src = 'slider/img/download-button.png'>
                                </span>
                            </a>

                        </div>
                        <div class = 'slider-title-content'>
                            <span class = 'slider-title-span'></span>
                        </div>
                        <div class = 'slider-paginator-content'>
                            <span class = 'slider-paginator-span'>Photo <span class = 'slider-paginator-span--page'></span> of <span class = 'slider-paginator-span--pages'></span></span>
                        </div>
                    </div>
                </div>
            </div>`);
        }

        destroySlider(){
            this.body.find('.slider-content').remove();
        }
    }

    class core{
        
        constructor(element, defaultData, data){

            this.dataSource = new dataSource(defaultData, data);
            this.paginator = new paginator(this.dataSource, element);
            this.htmlElements = new htmlElements(element);
            this.swiper;
            
            this.element = $(element);
            this.body = $('body');


            this._idAutoPlayInterval;
            this._autoPlayState = 0;

            this.keyCode = {
				enter: 13,
				tab: 9,
                escape: 27,
                up: 38,
				left: 37,
                right: 39,
                down: 40,
				zero: 48,
				nine: 57,
				num0: 96,
				num9: 105
            };
            
            this.wheel = {
                up: 120,
                down: -120
            }

            this.htmlElements.sender.classList.add('slider-init');

            this.htmlElements.sender.addEventListener('click', e => {

                this.init()
            });
        }

        //Initialization
        init(){

            const that = this;

            
            /*this.element
                //see bottom to top

                //footer
                .prepend(`<div class = 'slider-footer'>
                            <div class = 'slider-footer-panel'>
                                <div class = 'slider-actions-content'>

                                    <span class = 'slider-actions--button-play slider-actions--button slider-element-show'>
                                        <img class = 'slider-actions--button-play-image slider-actions--button-image' src = 'img/play-button.png'>
                                    </span>

                                    <a class = 'slider-download-image' href="" download>
                                        <span class = 'slider-actions--button-download slider-actions--button slider-element-show'>
                                                <img class = 'slider-actions--button-download-image slider-actions--button-image' src = 'img/download-button.png'>
                                        </span>
                                    </a>

                                </div>
                                <div class = 'slider-title-content'>
                                    <span class = 'slider-title-span'></span>
                                </div>
                                <div class = 'slider-paginator-content'>
                                    <span class = 'slider-paginator-span'>Photo <span class = 'slider-paginator-span--page'></span> of <span class = 'slider-paginator-span--pages'></span></span>
                                </div>
                            </div>
                        </div>`)

                //close button        
                .prepend(`<div class = 'slider-button-close'>
                            <img class = 'slider-button-close--image' src = 'img/close-button.png'>
                        </div>`)
                //arrows
                .prepend(`<div class = 'slider-arrow-next slider-arrow'>
                            <img class = 'slider-arrow-image-next slider-arrow-image' src = 'img/right-arrow.png'>
                        </div>`)

                .prepend(`<div class = 'slider-arrow-previous slider-arrow'>
                            <img class = 'slider-arrow-image-previous slider-arrow-image' src = 'img/left-arrow.png'>
                        </div>`)
                //image
                .prepend(`<div class = "slider-modal-content">
                            <div class = 'slider-image-content'>
                                <img class = 'slider-image' src = ''>
                                <span class = 'slider-description-content slider-element-hide'></span>
                            </div>
                        </div>`)

                //content
                .wrapInner('<div class = "slider-content slider-element-none" tabindex="0">');*/

                
            this.htmlElements.createSlider();

            if (this.paginator.pages <= 1){
                this.htmlElements.arrowPrevious.classList.add('slider-element-none');
                this.htmlElements.arrowNext.classList.add('slider-element-none');
                this.htmlElements.actionsButtonPlay.classList.remove('slider-element-show');
                this.htmlElements.actionsButtonPlay.classList.add('slider-element-none');
                this.htmlElements.sliderPaginatorContent.classList.add('slider-element-none');
            }

            if (this.dataSource.beforeOpen){
                const beforeOpen = this.dataSource.beforeOpen;
                beforeOpen(this);
            }

            this.openWindow();

            this.dataSource.sortData();
            this.paginator.init();
            
            this.initGallery();
            
            this.initArrow();

            this.initActions();

        }

        set imageSrc(value){
            this.htmlElements.image.src = value;
        }

        get imageSrc(){
            return this.htmlElements.image.src;
        }

        set titleHtml(value){
            this.htmlElements.title.innerHTML = value;
        }

        get titleHtml(){
            return this.htmlElements.title.innerHTML;
        }
        
        set description(value){
            this.htmlElements.description.innerHTML = value;
        }

        get description(){
            return this.htmlElements.description.innerHTML;
        }

        set downloadImageHref(value){
            this.htmlElements.downloadImage.href = value 
        }

        get downloadImageHref(){
            return this.htmlElements.downloadImage.href
        }

        set autoPlayState(value){
            this._autoPlayState = value;
        }

        get autoPlayState(){
            return this._autoPlayState;
        }

        initGallery(){

            const that = this;

            if (this.dataSource.data && this.dataSource.length){
                  
                //image
                if (this.dataSource.data[this.paginator.page - 1].src){
                    this.imageSrc = this.dataSource.data[this.paginator.page - 1].src;
                } else {
                    this.imageSrc = this.dataSource.default["0"].src;
                }
                
                //title
                if (this.dataSource.data[this.paginator.page - 1].title){
                    //this.titleHtml = this.dataSource.data[this.paginator.page - 1].title;
                    
                    if (this.dataSource.lang){
                        
                        
                        if (typeof(this.dataSource.data[this.paginator.page - 1].title)  === 'object' ){
                            if (this.titleHtml = this.dataSource.data[this.paginator.page - 1].title[this.dataSource.lang]){
                                this.titleHtml = this.dataSource.data[this.paginator.page - 1].title[this.dataSource.lang];   
                            } else {
                                this.titleHtml = '';
                            }
                        } else {
                            this.titleHtml = this.dataSource.data[this.paginator.page - 1].title;
                        }

                    } else {

                        if (typeof(this.dataSource.data[this.paginator.page - 1].title)  === 'object' ){
                            this.titleHtml = this.dataSource.data[this.paginator.page - 1].title[Object.keys(this.dataSource.data[this.paginator.page - 1].title)[0]];
                        } else {
                            this.titleHtml = this.dataSource.data[this.paginator.page - 1].title;
                        }
                        
                    }

                } else {
                    this.titleHtml = '';
                }

                //description
                if (this.dataSource.data[this.paginator.page - 1].description){

                    if (this.dataSource.lang){
                        
                        
                        if (typeof(this.dataSource.data[this.paginator.page - 1].description)  === 'object' ){
                            if (this.description = this.dataSource.data[this.paginator.page - 1].description[this.dataSource.lang]){
                                this.description = this.dataSource.data[this.paginator.page - 1].description[this.dataSource.lang];  
                                this.htmlElements.descriptionContent.classList.remove('slider-element-none');
                            } else {
                                this.description = '';
                                this.htmlElements.descriptionContent.classList.add('slider-element-none');
                            }
                        } else {
                            this.description = this.dataSource.data[this.paginator.page - 1].description;
                            this.htmlElements.descriptionContent.classList.remove('slider-element-none');
                        }

                    } else {

                        if (typeof(this.dataSource.data[this.paginator.page - 1].description)  === 'object' ){
                            this.description = this.dataSource.data[this.paginator.page - 1].description[Object.keys(this.dataSource.data[this.paginator.page - 1].description)[0]];
                        } else {
                            this.description = this.dataSource.data[this.paginator.page - 1].description;
                        }
                        this.htmlElements.descriptionContent.classList.remove('slider-element-none');
                        
                    }
                
                } else {
                
                    this.description = '';
                    this.htmlElements.descriptionContent.classList.add('slider-element-none');
                
                }

            } else {
                this.imageSrc = this.dataSource.default[0].src;
                this.htmlElements.descriptionContent.classList.add('slider-element-none');
            }
            
            this.downloadImageHref = this.imageSrc
        }

        initArrow(){
            const that = this;

            this.htmlElements.arrowNext.addEventListener('click', e => {
                this.nextImage();
            });
            
            this.htmlElements.arrowPrevious.addEventListener('click', e => {
                this.priviousImage();
            });

        }

        initActions(){
            const that = this;

            //image and description

            /*this.htmlElements.imageContent.addEventListener('mouseover', e => {
                that.htmlElements.description.classList.remove('slider-element-hide');
                that.htmlElements.description.classList.add('slider-element-show');
            })
            
            this.htmlElements.imageContent.addEventListener('mouseout', e => {
                that.htmlElements.description.classList.remove('slider-element-show');
                that.htmlElements.description.classList.add('slider-element-hide');
            })*/

            //auto play

            this.htmlElements.actionsButtonPlay.addEventListener('click', e => {
                that.autoPlay();
            })
            
            if (this.dataSource.playState){
                this.autoPlay();
            }

            //download Image
            this.downloadImageHref = this.imageSrc

            //keys to content
            $(this.htmlElements.sliderContent).bind('keydown', e => {
                if (e.keyCode === that.keyCode.left || e.keyCode === that.keyCode.down){
                    that.priviousImage();
                } else if (e.keyCode === that.keyCode.right || e.keyCode === that.keyCode.up){
                    that.nextImage();
                } else if (e.keyCode === that.keyCode.escape){
                    that.closeWindow();
                }
            })

            this.htmlElements.sliderContent.addEventListener('wheel', e => {
                if (e.wheelDelta == that.wheel.up){
                    that.nextImage();
                } else if (e.wheelDelta == that.wheel.down){
                    that.priviousImage();
                }
            })

            //swipes
            let pageWidth = window.innerWidth || document.body.clientWidth,
                treshold = Math.max(1,Math.floor(0.01 * (pageWidth))),
                touchstartX = 0,
                touchstartY = 0,
                touchendX = 0,
                touchendY = 0;
            
            const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
            
            const gestureZone = this.htmlElements.sliderContent;
            
            gestureZone.addEventListener('touchstart', function(event) {
                touchstartX = event.changedTouches[0].screenX;
                touchstartY = event.changedTouches[0].screenY;
            }, false);
            
            gestureZone.addEventListener('touchend', function(event) {
                touchendX = event.changedTouches[0].screenX;
                touchendY = event.changedTouches[0].screenY;
                handleGesture(event);
            }, false); 
            
            function handleGesture(e) {
                let x = touchendX - touchstartX,
                    y = touchendY - touchstartY,
                    xy = Math.abs(x / y),
                    yx = Math.abs(y / x);
                if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
                    
                    let left = 0,
                        right = 0,
                        top = 0,
                        bottom = 0;

                    if (yx <= limit) {
                        if (x < 0) {
                            //console.log("left");
                            left = 1;
                        } else {
                            //console.log("right");
                            right = 1;
                            
                        }
                    }
                    if (xy <= limit) {
                        if (y < 0) {
                            //console.log("top");
                            top = 1;
                        } else {
                            //console.log("bottom");
                            bottom = 1;
                        }
                    }

                    if (left && !right && !top && !bottom){
                        that.nextImage()
                    }

                    if (!left && right && !top && !bottom){
                        that.priviousImage()
                    }

                } //else {
                    //console.log("tap");
                //}
            }


            //close window

            this.htmlElements.closeButton.addEventListener('click', e => {
                that.closeWindow();
            })
            
        }
        nextImage(){
            if (this.paginator.page < this.paginator.pages){
                this.paginator.page += 1;
                this.initGallery();
            } else {
                this.paginator.page = 1;
                this.initGallery();
            }
        }

        priviousImage(){
            if (this.paginator.page > 1){
                this.paginator.page -= 1;
                this.initGallery();
            } else {
                this.paginator.page = this.paginator.pages;
                this.initGallery();
            }
        }

        autoPlay(){
            
            if (!this.autoPlayState){
                this.autoPlayState = 1;
                this._idAutoPlayInterval = setInterval(this.nextImage.bind(this), this.dataSource.playDelay);
                this.htmlElements.actionsButtonPlayImage.src = 'slider/img/stop-button.png';
            } else {
                this.autoPlayState = 0;
                clearInterval(this._idAutoPlayInterval);
                this.htmlElements.actionsButtonPlayImage.src = 'slider/img/play-button.png';
            }
        }

        beforeOpen(){
            console.log('before open');
        }
        closeWindow(){
            this.htmlElements.sliderContent.classList.remove('slider-element-show');
            this.htmlElements.sliderContent.classList.add('slider-element-hide');
            this.htmlElements.destroySlider();
            this.htmlElements.body[0].classList.remove('slider-body');
        }

        
        openWindow(){
            this.htmlElements.sliderContent.classList.remove('slider-element-hide');
            this.htmlElements.sliderContent.classList.add('slider-element-show');
        }
    }

    //data --> for data
    //methods --> for methods
    $.fn.slider = function(data, methods) {
    
        let result = this;
        return this.each(function () {
            let slider;
            if (!$(this).data('slider')) {
                slider = new core(this, $.fn.slider.defaultData, data);
                //slider.init();
                $(this).data('slider', slider);
            } else {
                slider = $(this).data('slider');
            }
            if ($.type(data) === 'string' && slider[data] !== undefined && $.isFunction(slider[data])) {
                result = slider[data](methods);
            }
        });
        return result;
    };

    $.fn.slider.defaultData = {
        items: [
            {
                src: 'slider/img/image-not-found.jpg',
                title: 'Image not found',
                description: {
                    'ua': 'Зображення не знайдено',
                    'en': 'Image not found'
                }
            }
        ],
        playDelay: 2000,
        playState: 0
    };

}));

