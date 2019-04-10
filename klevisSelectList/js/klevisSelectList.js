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

        constructor(defaultData, data, core){
            this._defaultData = defaultData;
            this._data = data;
            this.core = core;
            this._total;
            this._filterItems;
        }
        
        get data(){
            return this._data;
        }

        get default(){
            return this._defaultData;
        }
        
        set source(value){
            this.data.source = value;
        }

        get source(){
            return this.data.source;
        }
        
        set items(value){
            this.source.items = value;
        }

        get items(){
            return this.source.items;
        }
        
        set filterItems(value){
            this._filterItems = value;
        }

        get filterItems(){
            return this._filterItems;
        }

        set transport(value){
            this.data.source.transport = value;
        }

        get transport(){
            return this.data.source.transport;
        }

        get valueField(){
            return this.data.valueField;
        }

        set valueField(value){
            this.data.valueField = value;
        }

        get textField(){
            return this.data.textField;
        }

        set textField(value){
            this.data.textField = value;
        }

        get autoRead(){
            return this.data.autoRead;
        }

        set autoRead(value){
            this.data.autoRead = value;
        }

        get autoWidth(){
            return this.data.autoWidth;
        }

        set autoWidth(value){
            this.data.autoWidth = value;
        }

        get total(){
            return this._total;
        }

        set total(value){
            this._total = value;
        }

        get filter(){
            return this.data.filter;
        }

        set filter(value){
            this.data.filter = value;
        }

        read(){

            const that = this;

            this.core.htmlElements.loading();

            if (this.transport){
                that.transport(that);
            } else {
                this.core.htmlElements.waiting();
                this.core._initList();
            }

        }

        //get items from get request
        success(value){

            this.core.htmlElements.waiting();
            this.items = value;
            this.core._initList();
        }

        set lang(value){
            this.data.lang = value;
        }

        get lang(){
            return this.data.lang;
        }

        get label(){
            return this.data.label;
        }

        set label(value){
            this.data.label = value;
        }

        get validText(){
            return this.data.validText;
        }

        set validText(value){
            this.data.validText = value;
        }

        get required(){
            return this.data.required;
        }

        set required(value){
            this.data.required = value;
        }

        set beforeOpen(value){
            this.data.beforeOpen = value;
        }

        get beforeOpen(){
            return this.data.beforeOpen;
        }
        
        set change(value){
            this.data.change = value;
        }

        get change(){
            return this.data.change;
        }

        set validOptions(value){
            this.data.validationOptions = value;
        }

        get validOptions(){
            return this.data.validOptions;
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

        get label(){
            return this.element.find('.klevis-select-list-label')[0];
        }

        get selectList(){
            return this.element.find('.klevis-select-list')[0];
        }
        
        get selectListItem(){
            return this.element.find('.klevis-select-list--item')[0];
        }

        get menu(){
            return this.element.find('.klevis-select-list--menu')[0];
        }

        get list(){
            return this.element.find('.klevis-select-list--menu');
        }

        get listItems(){
            return this.element.find('.klevis-select-list--menu-items');
        }

        get selectListContent(){
            return this.element.find('.klevis-select-list-content');
        }

        get valid(){
            return this.element.find('.klevis-select-list-valid')[0];
        }

        get validText(){
            return this.element.find('.klevis-select-list-valid-text')[0];
        }

        get imageContent(){
            return this.element.find('.klevis-select-list-image-content');
        }

        get imageArrow(){
            return this.element.find('.klevis-select-list-image-arrow')[0];
        }

        get imageControl(){
            return this.element.find('.klevis-select-list-image-control')[0];
        }

        loading(){
            this.imageControl.classList.add('klevis-select-list-read');
            this.imageControl.src = 'klevisSelectList/img/loading.png';
        }

        waiting(){
            this.imageControl.classList.remove('klevis-select-list-read');
            this.imageControl.src = 'klevisSelectList/img/waiting.png';
        }

        createSelectList(){
            this.element
            .prepend(`
                <label class = 'klevis-select-list-label'></label>
                <div class = 'klevis-select-list--div'>
                    <div class = 'klevis-select-list' >
                        <span class = 'klevis-select-list--item'></span>
                    </div>
                    <div class = 'klevis-select-list-image-content'>
                        <img class = 'klevis-select-list-image-arrow' src = 'klevisSelectList/img/arrow-down.png'>
                        <img class = 'klevis-select-list-image-control' src = 'klevisSelectList/img/waiting.png'>
                    </div>
                </div>
                <div class = 'klevis-select-list--menu klevis-select-list--close' >
                    <div class = 'klevis-select-list--menu-items'></div>
                </div>
            `)
            .wrapInner(`
                <div class = "klevis-select-list-content" >
            `)
        }

        destroyRequired(){
            this.element.find('.klevis-select-list-valid').remove();
        }
    }

    class core{
        
        constructor(element, defaultData, data){
            
            this.htmlElements = new htmlElements(element);
            this.dataSource = new dataSource(defaultData, data, this);
            
            this.element = $(element);

            this.state = 'close';
            this.elementId;
            
            this._dataItem;

            this._index;
            this._text;
            this._value;
            this._countOpen = 0;

            this._init()
        }

        //Initialization
        _init(){

            const that = this;

            this.htmlElements.createSelectList();


            if (this.dataSource.beforeOpen){
                const beforeOpen = this.dataSource.beforeOpen;
                beforeOpen(this);
            }
            
            this._initId();

            if (this.dataSource.autoRead){
                this.dataSource.read();
            }
            

            this.refresh(); 

            $(document).click(function(event) { 
                let $target = $(event.target);

                if ($target.closest(`#${that.elementId}`).length){
                    
                    
                    if (!$target.closest('.klevis-select-list--filter').length){

                        if (that.state == 'open'){
                            that.close();
                        } else {    
                            that._countOpen++;

                            that.open();
                        }

                        if ($target.closest(`.klevis-select-list--menu span`).length){

                            that.dataItem = $target["0"].getAttribute('data-index');
                        }

                    }
                    

                } else {
                    
                    if (that.state == 'open'){
                        that.close();
                    } 
                }

            });

        }

        _initId(){
        
            if (this.htmlElements.sender.id){
                this.elementId = this.htmlElements.sender.id;
            } else {
                this.elementId = Math.random().toString(36).substring(7);
            }
            this.htmlElements.sender.setAttribute('id', `${this.elementId}`);


        }
        set labelHtml(value){
            this.htmlElements.label.innerHTML = value;
        }

        get labelHtml(){
            return this.htmlElements.label.innerHTML;
        }

        _initLabel(){
            //label
            if (this.dataSource.label){

                if (this.dataSource.lang){
        
                    if (typeof(this.dataSource.label)  === 'object' ){
        
                        if (this.dataSource.label[this.dataSource.lang]){
                            this.labelHtml = this.dataSource.label[this.dataSource.lang];   
                        } else {
                            this.labelHtml = this.dataSource.label[Object.keys(this.dataSource.label)[0]];
                        }
        
                    } else {
                            this.labelHtml = this.dataSource.label
                    }
        
                } else {
        
                    if (typeof(this.dataSource.label)  === 'object' ){
                        this.labelHtml = this.dataSource.label[Object.keys(this.dataSource.label)[0]];
                    } else {
                        this.labelHtml = this.dataSource.label;
                    }
                    
                }
        
            } else {
                this.labelHtml = this.dataSource.default.label
            }
        }

        _initList(){

            const that = this;

            this.dataSource.total = this.dataSource.items.length;

            if (this.dataSource.filter){
                let elementFilter = `<span class = 'klevis-select-list--filter'></span>`
                that.htmlElements.list.prepend(elementFilter);

                $('.klevis-select-list--filter').klevisInput({
                    imageControl: `klevisSelectList/img/search.png`,
                    change(options){
                        that._filterItems(options.inputValue);
                    }
                });
            }

            let createList = new Promise(function(resolve, reject) {
                that.dataSource.items.map((item, index) => {
                    let elementList = `<span data-index = ${index} value = '${item[that.dataSource.valueField]}' >${item[that.dataSource.textField]}</span>`;
                    that.htmlElements.listItems.append(elementList);
                })
                resolve()
            })
            createList.then(value => {

                if (!this.dataSource.autoWidth){
                    that.htmlElements.menu.style.width = `${that.htmlElements.selectListContent.width()}px`;
                }
        
                if (that.htmlElements.menu.offsetHeight > 200){
                    that.htmlElements.menu.classList.add('klevis-select-list--menu-scroll');
                }
            });
            
        }
        
        _findIndexItemByValue(value){
            return this.dataSource.items.findIndex(item => item[this.dataSource.valueField] === value);
        }

        _findIndexItemByText(value){
            //return this.dataSource.items.filter(item => { return item[this.dataSource.textField] == value; });
            return this.dataSource.items.filter(item => Object.keys(item).some(key => item[key].includes(value)));
        }

        _filterItems(value){

            const that = this;
            this.dataSource.filterItems = this._findIndexItemByText(value);
            
            if (this.dataSource.filterItems.length > 0){
                this.htmlElements.listItems.empty();
                let createList = new Promise(function(resolve, reject) {
                    that.dataSource.filterItems.map((item, index) => {
                        let elementList = `<span data-index = ${index} value = '${item[that.dataSource.valueField]}' >${item[that.dataSource.textField]}</span>`;
                        that.htmlElements.listItems.append(elementList);
                    })
                    resolve()
                })
                createList.then(value => {
    
                    if (!this.dataSource.autoWidth){
                        that.htmlElements.menu.style.width = `${that.htmlElements.selectListContent.width()}px`;
                    }
            
                    if (that.htmlElements.menu.offsetHeight > 200){
                        that.htmlElements.menu.classList.add('klevis-select-list--menu-scroll');
                    }
                });
            }
        }

        set index(value){
            this._index = value;
        }

        get index(){
            return this._index;
        }
        
        set text(value){
            this._text = value;
            this.htmlElements.selectListItem.innerHTML = value;
        }

        get text(){
            return this.htmlElements.selectListItem.innerHTML;
        }

        set value(value){
            this._value = value;
            this.dataItem = this._findIndexItemByValue(value);
        }

        get value(){
            return this._value;
        }

        set dataItem(index){
            
            if (index){

                const that = this;
    
                if (this.dataItem){
                    this.htmlElements.list.find(`[data-index = ${this.index}]`)[0].classList.remove(`klevis-select-list--selected`);
                }
    
                this._dataItem = this.dataSource.items[index];
    
                this.index = index;
                this.text = this.dataItem[this.dataSource.textField];
                this._value = this.dataItem[this.dataSource.valueField];
    
                if (this.dataSource.change){
                    that.dataSource.change(that);
                }    
                
    
                this.htmlElements.list.find(`[data-index = ${this.index}]`)[0].classList.add(`klevis-select-list--selected`);

            }
        }

        get dataItem(){
            return this._dataItem;
        }


        open(){
            this.htmlElements.menu.classList.remove('klevis-select-list--close');
            this.htmlElements.menu.classList.add('klevis-select-list--open');
            this.state = 'open';
            this.htmlElements.imageArrow.src = 'klevisSelectList/img/arrow-up.png';
            
            if (this._countOpen == 1 && !this.dataSource.autoRead){
                this.dataSource.read();
            }
        }

        close(){
            this.htmlElements.menu.classList.remove('klevis-select-list--open');
            this.htmlElements.menu.classList.add('klevis-select-list--close');
            this.state = 'close';
            this.htmlElements.imageArrow.src = 'klevisSelectList/img/arrow-down.png';
        }

        refresh(){

            this._initLabel();
   
        }

    }

    //data --> for data
    //methods --> for methods
    $.fn.klevisSelectList = function(data, methods) {
    
        let result = this;
        return this.each(function () {
            let klevisSelectList;
            if (!$(this).data('klevis-input-valid')) {
                klevisSelectList = new core(this, $.fn.klevisSelectList.defaultData, data);
                $(this).data('klevisSelectList', klevisSelectList);
            } else {
                klevisSelectList = $(this).data('klevisSelectList');
            }
            if ($.type(data) === 'string' && klevisSelectList[data] !== undefined && $.isFunction(klevisSelectList[data])) {
                result = klevisSelectList[data](methods);
            }
        });
        return result;
    };

    $.fn.klevisSelectList.defaultData = {
        label: '&nbsp;',
        type: 'number'
    };

}));

