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
            return new Promise( (resolve, reject) => {
                this.core.htmlElements.loading();
                
                if (this.transport){
                    that.transport(that);
                    resolve();
                } else {
                    this.core.htmlElements.waiting();
                    this.core._initList();
                    resolve();
                }
            })

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
        
        set nullOption(value){
            this.data.nullOption = value;
        }

        get nullOption(){
            return this.data.nullOption;
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

        set imageControl(value){
            this.data.imageControl = value;
        }

        get imageControl(){
                return this.data.imageControl;
        }

        set changeImageControl(value){
            this.data.changeImageControl = value;
        }

        get changeImageControl(){
            return this.data.changeImageControl;
        }

        set displayImageControl(value){
            this.data.displayImageControl = value;
        }

        get displayImageControl(){
            if (this.data.displayImageControl || this.data.displayImageControl === false){
                return this.data.displayImageControl;
            } else {
                return this.default.displayImageControl;
            }
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
        
        get selectListDiv(){
            return this.element.find('.klevis-select-list--div')[0];
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
            return this.element.find('.klevis-select-list-valid--div')[0];
        }

        get validText(){
            return this.element.find('.klevis-select-list-valid--div-text')[0];
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

        get filter(){
            return this.element.find('.klevis-select-list--filter');
        }

        get filterInput(){
            return this.element.find('.klevis-select-list--filter').data('klevisInput');
        }

        get menuItem(){
            return this.element.find('.klevis-select-list--menu-item');
        }

        get itemSelected(){
            return this.element.find('.klevis-select-list--selected')[0];
        }

        loading(){
            if (this.imageControl){
                this.imageControl.classList.add('klevis-select-list-read');
                this.imageControl.src = 'klevisMultiSelectList/img/loading.png';
            }
        }

        waiting(){
            if (this.imageControl){
                this.imageControl.classList.remove('klevis-select-list-read');
            }
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
                        <img class = 'klevis-select-list-image-arrow' src = 'klevisMultiSelectList/img/arrow-down.png'>
                        <img class = 'klevis-select-list-image-control'>
                    </div>
                </div>
                <div class = 'klevis-select-list--menu klevis-select-list--close' >
                    <div class = 'klevis-select-list--menu-items'></div>
                </div>
            `)
            .wrapInner(`
                <div class = "klevis-select-list-content" tabindex="0" >
            `)
        }

        destroyRequired(){
            this.element.find('.klevis-select-list-valid--div').remove();
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
            this._selected;
            this._mouseDown = false;
            this._length = 0;
            
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
                num9: 105,
                f: 70,
            };

            this._init()
        }

        //Initialization
        _init(){

            const that = this;

            this.htmlElements.createSelectList();

            if (this.dataSource.imageControl){
                this.imageControl = this.dataSource.imageControl;
            } else {
                this.imageControl = 'klevisMultiSelectList/img/waiting.png';
            }

            if (!this.dataSource.displayImageControl){
                
                this.htmlElements.imageControl.remove();
            }

            if (this.dataSource.beforeOpen){
                const beforeOpen = this.dataSource.beforeOpen;
                beforeOpen(this);
            }
            
            this._initId();

            if (this.dataSource.autoRead){
                this.dataSource.read();
            }
            

            this.refresh(); 

            this.htmlElements.selectListContent[0].addEventListener('mousedown', () => {
                that._mouseDown = true;
            });
  
            this.htmlElements.selectListContent[0].addEventListener('mouseup', () => {
                that._mouseDown = false;
            });

            this.htmlElements.selectListContent[0].addEventListener('focus', e => {

                if (!that._mouseDown){
                    
                    if (that.state == 'close'){
                        that._countOpen++;
    
                        that.open();
                    }

                }

            })


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

                        if ($target.closest(`.klevis-select-list--menu-item`).length){

                            that.value = $target["0"].getAttribute('value');
                        }

                    }
                    

                } else {
                    
                    if (that.state == 'open'){
                        that.close();
                    }
                }

            });

            //keys to content
            this.htmlElements.selectListContent.bind('keydown', e => {
                
                if (that.length){
                    
                    if (e.keyCode === that.keyCode.down || e.keyCode === that.keyCode.right){
                        if (!that.dataItem){
                            that.value = that.dataSource.filterItems[0][that.dataSource.valueField];
                        } else {
                            if (that.selected + 1 < that._length){
                                that.dataItem = that.selected * 1 + 1;
                            }
                        }
                        
                    } else if (e.keyCode === that.keyCode.up || e.keyCode === that.keyCode.left){

                        if (!that.dataItem){
                            that.value = that.dataSource.filterItems[0][that.dataSource.valueField];
                        } else {
                            if (that.dataSource.nullOption){
                                if (that.selected >= 0){
                                    that.dataItem = that.selected * 1 - 1;
                                }
                            } else {
                                if (that.selected >= 1){
                                    that.dataItem = that.selected * 1 - 1;
                                }
                            }
                        }
                    }

                }

                if (e.keyCode === that.keyCode.escape || e.keyCode === that.keyCode.enter){
                    that.close();
                }
            })

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

            this.dataSource.filterItems = this.dataSource.items;
            this._length = this.dataSource.total;

            if (this.dataSource.filter){
                if (!this.htmlElements.filter.length){
                    let elementFilter = `<span class = 'klevis-select-list--filter'></span>`
                    that.htmlElements.list.prepend(elementFilter);

                    $('.klevis-select-list--filter').klevisInput({
                        imageControl: `klevisMultiSelectList/img/search.png`,
                        change(options){
                            that._filterItems(options.val);
                        }
                    });
                }
            }

            let createList = new Promise((resolve, reject) => {
                that.clear();
                that.htmlElements.menuItem.remove()
                
                if (that.dataSource.nullOption){
                    that.htmlElements.listItems.append(`<span data-index = -1 value = ' ' class = 'klevis-select-list--menu-item'>&nbsp;</span>`);
                }

                that.dataSource.items.map((item, index) => {
                    let elementList = `<span data-index = ${index} value = '${item[that.dataSource.valueField]}' class = 'klevis-select-list--menu-item'>${item[that.dataSource.textField]}</span>`;
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
                
                if (that.dataSource.filter){
                    that.filterFocus();
                }
                
                if (this.dataSource.imageControl){
                    this.imageControl = this.dataSource.imageControl;
                } else {
                    this.imageControl = 'klevisMultiSelectList/img/waiting.png';
                }
            });
            
        }
        
        _findIndexItemByValue(value){
            return this.dataSource.filterItems.findIndex(item => 
                item[this.dataSource.valueField] == value
            );
        }

        _findIndexItemByText(value){
            //return this.dataSource.items.filter(item => { return item[this.dataSource.textField] == value; });
            return this.dataSource.items.filter(
                item => Object.keys(item).some(
                    key => item[key].toLowerCase().includes(value.toLowerCase())
                )
            );
        }

        _filterItems(value){

            const that = this;
            this.dataSource.filterItems = this._findIndexItemByText(value);
           
            if (this.dataSource.filterItems.length >= 0){
                
                this._length = this.dataSource.filterItems.length;
                this._selected = -1;
                this.htmlElements.listItems.empty();

                let createList = new Promise(function(resolve, reject) {

                    if (that.dataSource.nullOption){
                        that.htmlElements.listItems.append(`<span data-index = -1 value = ' ' class = 'klevis-select-list--menu-item'>&nbsp;</span>`);
                    }

                    that.dataSource.filterItems.map((item, index) => {
                        let elementList = `<span data-index = ${index} value = '${item[that.dataSource.valueField]}' class = 'klevis-select-list--menu-item'>${item[that.dataSource.textField]}</span>`;
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

        set imageControl(value){
            if (this.dataSource.displayImageControl){
                this.htmlElements.imageControl.src = value;
            }
        }

        get imageControl(){
            return this.htmlElements.imageControl.src;
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

        set required(value){
            this.dataSource.required = value;
        }

        get required(){
            return this.dataSource.required;
        }

        set validTextHtml(value){
            this.htmlElements.validText.innerHTML = value;
        }

        get validTextHtml(){
            return this.htmlElements.validText.innerHTML;
        }

        set validText(value){
            this.dataSource.validText = value;
        }

        get validText(){
            return this.dataSource.validText;
        }

        set filterValue(value){
            this.htmlElements.filterInput.val = value;
        }

        get filterValue(){
            return this.htmlElements.filterInput.val;
        }
        
        set dataItem(index){
            
            if (index.toString()){

                const that = this;
                that._selected = index;

                if (this.dataItem){
                    try {
                        this.htmlElements.list.find(`[data-index = ${this.index}]`)[0].classList.remove(`klevis-select-list--selected`);
                    } catch (error) {
                        null;
                    }
                }

                if (that.index == -1){
                    this.htmlElements.list.find(`[data-index = ${this.index}]`)[0].classList.remove(`klevis-select-list--selected`);
                }
    
                this._dataItem = this.dataSource.filterItems[index];

                this.index = index;
                if (this.index != -1){
                    this.text = this.dataItem[this.dataSource.textField];
                    this._value = this.dataItem[this.dataSource.valueField];
                } else {
                    this.text = '';
                    this._value = '';
                }
    
                if (this.dataSource.change){
                    that.dataSource.change(that);
                }    
                
                if (this.dataSource.validOptions){
                    const validOptions = this.dataSource.validOptions;
                    validOptions(this);
                    this.checkRequired();
                }

                
                this.htmlElements.list.find(`[data-index = ${this.index}]`)[0].classList.add(`klevis-select-list--selected`);
                setTimeout(() => {
                    that.htmlElements.itemSelected.scrollIntoView({block: "center", behavior: "smooth"});
                }, 0);
            }
        }

        get dataItem(){
            return this._dataItem;
        }

        get selected(){
             return this._selected;
        }

        get length(){
            return this._length;
        }

        checkRequired(){
            //required
            if (this.dataSource.required ){

                this.htmlElements.selectListDiv.classList.add('klevis-select-list-valid');
                this.htmlElements.selectListDiv.classList.remove('klevis-select-list-success');

                this.htmlElements.label.classList.add('klevis-select-list-label-valid');
                this.htmlElements.label.classList.remove('klevis-select-list-label-success');

                this.imageControl = 'klevisMultiSelectList/img/error.png';

                if (!this.htmlElements.valid){
                    this.htmlElements.selectListContent.append(`<div class = 'klevis-select-list-valid--div'>
                        <span class="klevis-select-list-valid--div-text"></span>
                    </div>`)
                }
                
                //valid text
                if (this.dataSource.validText){
                
                    if (this.dataSource.lang){
                    
                        if (typeof(this.dataSource.validText)  === 'object' ){
                        
                            if (this.dataSource.validText[this.dataSource.lang]){
                                this.validTextHtml = this.dataSource.validText[this.dataSource.lang];   
                            } else {
                                this.validTextHtml = this.dataSource.validText[Object.keys(this.dataSource.label)[0]];
                            }
                        
                        } else {
                                this.validTextHtml = this.dataSource.validText
                        }
                    
                    } else {
                    
                        if (typeof(this.dataSource.validText)  === 'object' ){
                            this.validTextHtml = this.dataSource.validText[Object.keys(this.dataSource.validText)[0]];
                        } else {
                            this.validTextHtml = this.dataSource.validText;
                        }
                    
                    }
                
                } else {
                    this.validTextHtml = this.dataSource.default.validText;
                }
            } else {
                
                this.htmlElements.selectListDiv.classList.remove('klevis-select-list-valid');
                this.htmlElements.selectListDiv.classList.add('klevis-select-list-success');
                
                this.htmlElements.label.classList.remove('klevis-select-list-label-valid');
                this.htmlElements.label.classList.add('klevis-select-list-label-success');

                this.htmlElements.destroyRequired();
                this.imageControl = 'klevisMultiSelectList/img/success.png';

            }
        }

        open(){

            const that = this;

            this.htmlElements.menu.classList.remove('klevis-select-list--close');
            this.htmlElements.menu.classList.add('klevis-select-list--open');
            this.state = 'open';
            this.htmlElements.imageArrow.src = 'klevisMultiSelectList/img/arrow-up.png';

            if (this._countOpen == 1 && !this.dataSource.autoRead){
                this.dataSource.read();
            } else if (this.dataSource.filter){
               that.filterFocus();
            }

        }

        close(){

            this.htmlElements.menu.classList.remove('klevis-select-list--open');
            this.htmlElements.menu.classList.add('klevis-select-list--close');
            this.state = 'close';
            this.htmlElements.imageArrow.src = 'klevisMultiSelectList/img/arrow-down.png';

        
        }

        refresh(){

            this._initLabel();
   
        }

        clear(){
            this._dataItem = null;
            this.text = '';
            this._value = '';
            if (this.dataSource.filter){
                this.filterValue = '';
            }
        }

        filterFocus(){
            this.htmlElements.filterInput.focus();
        }

    }

    //data --> for data
    //methods --> for methods
    $.fn.klevisMultiSelectList = function(data, methods) {
    
        let result = this;
        return this.each(function () {
            let klevisMultiSelectList;
            if (!$(this).data('klevis-input-valid')) {
                klevisMultiSelectList = new core(this, $.fn.klevisMultiSelectList.defaultData, data);
                $(this).data('klevisMultiSelectList', klevisMultiSelectList);
            } else {
                klevisMultiSelectList = $(this).data('klevisMultiSelectList');
            }
            if ($.type(data) === 'string' && klevisMultiSelectList[data] !== undefined && $.isFunction(klevisMultiSelectList[data])) {
                result = klevisMultiSelectList[data](methods);
            }
        });
        return result;
    };

    $.fn.klevisMultiSelectList.defaultData = {
        label: '&nbsp;',
        type: 'number',
        displayImageControl: true
    };

}));

