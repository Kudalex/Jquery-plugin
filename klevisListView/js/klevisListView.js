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

        get groupField(){
            return this.data.groupField;
        }

        set groupField(value){
            this.data.groupField = value;
        }
        
        get autoRead(){
            
            if (this.data.autoRead || this.data.autoRead === false){
                return this.data.autoRead;
            } else {
                return this.default.autoRead;
            }

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
                
                this.core._selected = [];
                this.core.htmlElements.selectedContainer.empty();
                
                this.core.loading();
                
                if (this.transport){
                    that.transport(that);
                    resolve();
                } else {
                    this.core.waiting();
                    this.core._initList();
                    resolve();
                }
            })

        }

        //get items from get request
        success(value){
            
            this.core.waiting();
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

        get numColls(){
            
            if (this.data.numColls || this.data.numColls === false){
                return this.data.numColls;
            } else {
                return this.default.numColls;
            }

        }
        
        get height(){
            return this.data.height;
        }

        set height(value){
            this.data.height = value;
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

        get content(){
            return this.element.find('.klevis-list-view-content');
        }

        get label(){
            return this.element.find('.klevis-list-view--label');
        }

        get filter(){
            return this.element.find('.klevis-list-view--filter');
        }

        get filterInput(){
            return this.element.find('.klevis-list-view--filter').data('klevisInput');
        }

        get selectedContainer(){
            return this.element.find('.klevis-list-view--selected-container');
        }

        get selectedItem(){
            return this.element.find('.klevis-list-view--selected-item');
        }

        get selectedDelete(){
            return this.element.find('.klevis-list-view--selected-item-delete');
        } 

        get menu(){
            return this.element.find('.klevis-list-view--menu');
        }

        get menuItem(){
            return this.element.find('.klevis-list-view--menu-item');
        }

        get group(){
            return this.element.find('.klevis-list-view--menu-group');
        }

        get groupHead(){
            return this.element.find('.klevis-list-view--head-group');
        }
        
        get containerGroup(){
            return this.element.find('.klevis-list-view--container-group');
        }
        
        groupSelector(value){
            return this.element.find(`.klevis-list-view--menu-group--${value}`);
        }

        containerGroupSelector(value){
            return this.element.find(`.klevis-list-view--container-group--${value}`);
        }

        get imageHide(){
            return this.element.find('.klevis-list-view-image-hide');
        }

        get paginatorContainer(){
            return this.element.find('.klevis-list-view--paginator-container');
        }

        get paginator(){
            return this.element.find('.klevis-list-view--paginator');
        }
        
        get loading(){
            return this.element.find('.klevis-list-view-loading');
        }
        
        createListView(){
            this.element
            .prepend(`
                <label class = 'klevis-list-view--label'></label>
                <div class = 'klevis-list-view--selected-container' ></div>
                <div class = 'klevis-list-view--menu' ></div>
                <div class = 'klevis-list-view--paginator-container' >
                    <label class = 'klevis-list-view--paginator'></label>
                    <img class = 'klevis-list-view-loading' src = 'klevisListView/img/loading.png'>
                </div>
            `)
            .wrapInner(`
                <div class = "klevis-list-view-content" tabindex="0" >
            `)
        }
    }

    class core{
        
        constructor(element, defaultData, data){
            
            this.htmlElements = new htmlElements(element);
            this.dataSource = new dataSource(defaultData, data, this);
            
            this.element = $(element);
            this.elementId;
            
            this._dataItem;

            this._index;
            this._value;

            this._selected = [];

            this._mouseDown = false;
            this._length = 0;

            this._colls;
            this._groupArr = [];
            this._uniqueItems;

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

            this.htmlElements.createListView();

            this._initId();
            this._initLabel()

            if (this.dataSource.height){
                this.height(this.dataSource.height);
            }

            this._initNumColls(this.dataSource.numColls);

            if (this.dataSource.autoRead){
                this.dataSource.read();
            }

            this.htmlElements.loading[0].addEventListener('click', e => {
                that.dataSource.read();
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
            this.htmlElements.label[0].innerHTML = value;
        }

        get labelHtml(){
            return this.htmlElements.label[0].innerHTML;
        }

        set paginatorHtml(value){
            this.htmlElements.paginator[0].innerHTML = value;
        }

        get paginatorHtml(){
            return this.htmlElements.paginator[0].innerHTML;
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
            
            this.paginatorHtml =  ` ${this.dataSource.total} of ${this.dataSource.total} items`;

            this.dataSource.filterItems = this.dataSource.items;
            this._length = this.dataSource.total;
            
            if (this.dataSource.filter){
                if (!this.htmlElements.filter.length){

                    let elementFilter = `<span class = 'klevis-list-view--filter'></span>`
                    that.htmlElements.label.append(elementFilter);

                    $('.klevis-list-view--filter').klevisInput({
                        imageControl: `klevisListView/img/search.png`,
                        change(options){
                            that._filterItems(options.val);
                        }
                    });
                }
                that.htmlElements.filterInput.val = '';
            }

            let createList = new Promise((resolve, reject) => {
                
                this.htmlElements.menu.empty();
                

                if (that.dataSource.groupField){


                    that.dataSource.items.map((item, index) => {
                    	that._groupArr.push(item[that.dataSource.groupField])
                    })

                    that._uniqueItems = Array.from(new Set(that._groupArr))
                    //console.log(that._uniqueItems)
                    that._uniqueItems.map((itemGroup) => {

                        let elementNameGroup = `<div class = 'klevis-list-view--head-group' ><span class = 'klevis-list-view--group-name'>${itemGroup}</span><div class = 'klevis-list-view-image-content'><img class = 'klevis-list-view-image-hide' value = '${itemGroup}' state = 'close' src = 'klevisListView/img/arrow-up.png'></div></div>`;
                        that.htmlElements.menu.append(elementNameGroup);

                        let elementGroup = `<div class = 'klevis-list-view--menu-group klevis-list-view--menu-group--${itemGroup.replace(/[^a-zA-Z]/gi,'').replace(/\s+/gi,', ')}' ></div>`;
                        that.htmlElements.menu.append(elementGroup);

                        let containerGroup = `<div class = 'klevis-list-view--container-group klevis-list-view--container-group--${itemGroup.replace(/[^a-zA-Z]/gi,'').replace(/\s+/gi,', ')}' ></div>`;
                        that.htmlElements.groupSelector(itemGroup.replace(/[^a-zA-Z]/gi,'').replace(/\s+/gi,', ')).append(containerGroup)

                        that.dataSource.items.map((item, index) => {
                            if (item[that.dataSource.groupField] == itemGroup){
                                let elementList = `<span data-index = ${index} value = '${item[that.dataSource.valueField]}' class = 'klevis-list-view--menu-item'>${item[that.dataSource.textField]}<!--<img src="img/images_carbrands/${item[that.dataSource.textField]}.png" onError="this.style.display='none'"></img>--></span>`;   
                                that.htmlElements.containerGroupSelector(itemGroup.replace(/[^a-zA-Z]/gi,'').replace(/\s+/gi,', ')).append(elementList);
                            }

                        })

                    })
                
                    Array.from(this.htmlElements.imageHide).forEach(function(element) {
                        element.addEventListener('click', e => {
                            let target = $(e.target)["0"],
                                currValue = target.getAttribute('value'),
                                state = target.getAttribute('state');

                            if (state == 'close'){
                                that.htmlElements.containerGroupSelector(currValue).hide(300);
                                target.setAttribute('state', 'open')
                                target.src = 'klevisListView/img/arrow-down.png'
                            } else {
                                that.htmlElements.containerGroupSelector(currValue).show(300);
                                target.setAttribute('state', 'close')
                                target.src = 'klevisListView/img/arrow-up.png';
                            }
                        })
                    });

                } else {

                    that.dataSource.items.map((item, index) => {
                    
                        //let elementList = `<span data-index = ${index} value = '${item[that.dataSource.valueField]}' class = 'klevis-list-view--menu-item'><img src="img/images_carbrands/${item[that.dataSource.textField]}.png" onError="this.style.display='none'"></img>${item[that.dataSource.textField]}</span>`;   
                        
                        let elementList = `<span data-index = ${index} value = '${item[that.dataSource.valueField]}' class = 'klevis-list-view--menu-item'>${item[that.dataSource.textField]}</span>`;   
                        that.htmlElements.menu.append(elementList);
                         
                    
                    })
                }


                

                resolve()
            })
            createList.then(value => {
                
                
                this._initNumColls(this._colls);
                
                if (that.dataSource.filter){
                    that.filterFocus();
                }
                
                
                Array.from(that.htmlElements.menuItem).forEach(function(element) {
                    element.addEventListener('click', e => {
                        let target = $(e.target)["0"],
                            value = target.getAttribute('value');

                            that.value = value;
                    })
                })

                if (that.dataSource.groupField){
                    that.htmlElements.groupHead.css({'grid-column-start': `1`});
                    that.htmlElements.groupHead.css({'grid-column-end': `${this._colls + 1}`});
                    that.htmlElements.group.css({'grid-column-start': `1`});
                    that.htmlElements.group.css({'grid-column-end': `${this._colls + 1}`});
                }
                
            });
            
        }
        
        _findSelectedItemByValue(value){
            if (this.selected.length == 0){
                return -1;
            } else {
                return this.selected.findIndex(item => 
                    item[this.dataSource.valueField] == value
                );
            }
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
                    key => ((item[key]).toString()).toLowerCase().includes(value.toLowerCase())
                )
            );
        }

        _filterItems(value){

            const that = this;
            this.dataSource.filterItems = this._findIndexItemByText(value);
           
            if (this.dataSource.filterItems.length >= 0){
                
                this._length = this.dataSource.filterItems.length;

                this.paginatorHtml =  ` ${this._length} of ${this.dataSource.total} items`;

                //console.log(this.dataSource.filterItems)
                this.htmlElements.menu.empty();

                if (that.dataSource.groupField){

                    that._groupArr = [];

                    that.dataSource.filterItems.map((item, index) => {
                    	that._groupArr.push(item[that.dataSource.groupField])
                    })

                    that._uniqueItems = Array.from(new Set(that._groupArr))
                    //console.log(that._uniqueItems)
                    that._uniqueItems.map((itemGroup) => {

                        let elementNameGroup = `<div class = 'klevis-list-view--head-group' ><span class = 'klevis-list-view--group-name'>${itemGroup}</span><div class = 'klevis-list-view-image-content'><img class = 'klevis-list-view-image-hide' value = '${itemGroup}' state = 'close' src = 'klevisListView/img/arrow-up.png'></div></div>`;
                        that.htmlElements.menu.append(elementNameGroup);

                        let elementGroup = `<div class = 'klevis-list-view--menu-group klevis-list-view--menu-group--${itemGroup.replace(/[^a-zA-Z]/gi,'').replace(/\s+/gi,', ')}' ></div>`;
                        that.htmlElements.menu.append(elementGroup);

                        let containerGroup = `<div class = 'klevis-list-view--container-group klevis-list-view--container-group--${itemGroup.replace(/[^a-zA-Z]/gi,'').replace(/\s+/gi,', ')}' ></div>`;
                        that.htmlElements.groupSelector(itemGroup.replace(/[^a-zA-Z]/gi,'').replace(/\s+/gi,', ')).append(containerGroup)

                        that.dataSource.filterItems.map((item, index) => {
                            if (item[that.dataSource.groupField] == itemGroup){
                                let elementList = `<span data-index = ${index} value = '${item[that.dataSource.valueField]}' class = 'klevis-list-view--menu-item'>${item[that.dataSource.textField]}<!--<img src="img/images_carbrands/${item[that.dataSource.textField]}.png" onError="this.style.display='none'"></img>--></span>`;   
                                that.htmlElements.containerGroupSelector(itemGroup.replace(/[^a-zA-Z]/gi,'').replace(/\s+/gi,', ')).append(elementList);
                            }

                        })

                    })
                
                    Array.from(this.htmlElements.imageHide).forEach(function(element) {
                        element.addEventListener('click', e => {
                            let target = $(e.target)["0"],
                                currValue = target.getAttribute('value'),
                                state = target.getAttribute('state');

                            if (state == 'close'){
                                that.htmlElements.containerGroupSelector(currValue).hide(300);
                                target.setAttribute('state', 'open')
                                target.src = 'klevisListView/img/arrow-down.png'
                            } else {
                                that.htmlElements.containerGroupSelector(currValue).show(300);
                                target.setAttribute('state', 'close')
                                target.src = 'klevisListView/img/arrow-up.png';
                            }
                        })
                    });

                } else {

                    that.dataSource.filterItems.map((item, index) => {
                    
                        //let elementList = `<span data-index = ${index} value = '${item[that.dataSource.valueField]}' class = 'klevis-list-view--menu-item'><img src="img/images_carbrands/${item[that.dataSource.textField]}.png" onError="this.style.display='none'"></img>${item[that.dataSource.textField]}</span>`;   
                        
                        let elementList = `<span data-index = ${index} value = '${item[that.dataSource.valueField]}' class = 'klevis-list-view--menu-item'>${item[that.dataSource.textField]}</span>`;   
                        that.htmlElements.menu.append(elementList);
                         
                    
                    })
                }

                
                Array.from(that.htmlElements.menuItem).forEach(function(element) {
                    element.addEventListener('click', e => {
                        let target = $(e.target)["0"],
                            value = target.getAttribute('value');

                            that.value = value;
                    })
                })

                this._initNumColls(this._colls);
            }
        }

        set imageHide(value){
            this.htmlElements.imageHide.src = value;
        }

        get imageHide(){
            return this.htmlElements.imageHide.src;
        }

        set index(value){
            this._index = value;
        }

        get index(){
            return this._index;
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


                if (this._findSelectedItemByValue(this._dataItem[that.dataSource.valueField]) == -1){

                    this._selected.push(this._dataItem);
                    this.index = index;

                    
                    let selectedItem = `<span data-index = ${this.index} value = '${this._dataItem[that.dataSource.valueField]}' class = 'klevis-list-view--selected-item'>${this._dataItem[that.dataSource.textField]}<img src = 'klevisListView/img/close.png' class = 'klevis-list-view--selected-item-delete'></img></span>`;   
                    that.htmlElements.selectedContainer.append(selectedItem);

                    if (this.index != -1){
                        this._value = this.dataItem[this.dataSource.valueField];
                    } else {
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


                    let deleteLink = `<img data-index = ${this.index} value = '${this._dataItem[that.dataSource.valueField]}' src = 'klevisListView/img/close.png' class = 'klevis-list-view--selected-item-delete'></img>`;

                    this.htmlElements.menu.find(`[data-index = ${this.index}]`)[0].classList.add(`klevis-list-view--selected`);
                    this.htmlElements.menu.find(`[data-index = ${this.index}]`).append(deleteLink);

                    function removeSelectedItem(e){

                        let target = $(e.target)["0"],
                            value = target.getAttribute('value'),
                            dataIndex = target.getAttribute('data-index');

                        that.selected.splice(that._findSelectedItemByValue(value), 1);

                        that.htmlElements.menu.find(`[data-index = ${dataIndex}]`)[0].removeEventListener('click', removeSelectedItem)
                        that.htmlElements.menu.find(`[data-index = ${dataIndex}]`)[0].classList.remove(`klevis-list-view--selected`);

                        that.htmlElements.selectedDelete.map((index, item) => {
                            if (item.getAttribute('data-index') == dataIndex){
                                item.remove()
                            }
                        })
                        
                        that.htmlElements.selectedItem.map((index, item) => {
                            if (item.getAttribute('data-index') == dataIndex){
                                item.remove()
                            }
                        })

                    }
                    this.htmlElements.menu.find(`[data-index = ${this.index}]`)[0].addEventListener('click', removeSelectedItem)

                    function removeSelectedItemContainer(e){
                        let target = $(e.target)["0"],
                            value = target.getAttribute('value'),
                            dataIndex = target.getAttribute('data-index');

                            that.selected.splice(that._findSelectedItemByValue(value), 1);
                            
                            that.htmlElements.menu.find(`[data-index = ${dataIndex}]`)[0].removeEventListener('click', removeSelectedItem)
                            that.htmlElements.menu.find(`[data-index = ${dataIndex}]`)[0].classList.remove(`klevis-list-view--selected`);
                            
                            that.htmlElements.selectedDelete.map((index, item) => {
                                if (item.getAttribute('data-index') == dataIndex){
                                    item.remove()
                                }
                            })
                            
                            that.htmlElements.selectedItem.map((index, item) => {
                                if (item.getAttribute('data-index') == dataIndex){
                                    item.remove()
                                }
                            })
                    }

                    this.htmlElements.selectedContainer.find(`[data-index = ${this.index}]`)[0].addEventListener('click', removeSelectedItemContainer)
                }
                
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

        filterFocus(){
            this.htmlElements.filterInput.focus();
        }

        _initNumColls(num){
            
            this._colls = num;
            let result = '';
            
            for (let i = 0; i < num; i++){
                result = result + ' 1fr ';
            }

            this.htmlElements.selectedContainer.css({'grid-template-columns': result});
            this.htmlElements.paginatorContainer.css({'grid-template-columns': result});

            this.htmlElements.paginator.css({'grid-column-start': `${this._colls + 1}`});
            

            if (this.dataSource.groupField){
                this.htmlElements.containerGroup.css({'grid-template-columns': result});
            } else {
                this.htmlElements.menu.css({'grid-template-columns': result});
            }
        }

        height(value){
            this.htmlElements.menu.css({'max-height': `${value}px`});
            this.htmlElements.menu.css({'overflow': 'scroll'});
            this.htmlElements.menu.css({'overflow-x': 'hidden'});
        }

        
        loading(){
            this.htmlElements.loading[0].classList.add('klevis-list-view-read');
            this.htmlElements.loading[0].src = 'klevisListView/img/loading.png';
        }

        waiting(){
            this.htmlElements.loading[0].classList.remove('klevis-list-view-read');
            this.htmlElements.loading[0].src = 'klevisListView/img/reload.png';
        }

    }

    //data --> for data
    //methods --> for methods
    $.fn.klevisListView = function(data, methods) {
    
        let result = this;
        return this.each(function () {
            let klevisListView;
            if (!$(this).data('klevis-input-valid')) {
                klevisListView = new core(this, $.fn.klevisListView.defaultData, data);
                $(this).data('klevisListView', klevisListView);
            } else {
                klevisListView = $(this).data('klevisListView');
            }
            if ($.type(data) === 'string' && klevisListView[data] !== undefined && $.isFunction(klevisListView[data])) {
                result = klevisListView[data](methods);
            }
        });
        return result;
    };

    $.fn.klevisListView.defaultData = {
        label: '&nbsp;',
        autoRead: true,
        numColls: 4
    };

}));

