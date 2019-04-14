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
        }
        
        get data(){
            return this._data;
        }

        get default(){
            return this._defaultData;
        }
        
        set lang(value){
            this.data.lang = value;
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

        get value(){
            return this.data.value;
        }

        set value(value){
            this.data.value = value;
        }

        get required(){
            return this.data.required;
        }

        set required(value){
            this.data.required = value;
        }

        get lang(){
            return this.data.lang;
        }

        set beforeOpen(value){
            this.data.beforeOpen = value;
        }

        get beforeOpen(){
            return this.data.beforeOpen;
        }

        set validOptions(value){
            this.data.validationOptions = value;
        }

        get validOptions(){
            return this.data.validOptions;
        }

        set type(value){
            this.data.type = value;
        }

        get type(){
            return this.data.type;
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
        
        set change(value){
            this.data.change = value;
        }

        get change(){
            return this.data.change;
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
            return this.element.find('.klevis-input-label')[0];
        }

        get input(){
            return this.element.find('.klevis-input')[0];
        }

        get inputContent(){
            return this.element.find('.klevis-input-content');
        }
        
        get inputDiv(){
            return this.element.find('.klevis-input--div')[0];
        }

        get valid(){
            return this.element.find('.klevis-valid')[0];
        }

        get validText(){
            return this.element.find('.klevis-input-valid-text')[0];
        }

        get imageContent(){
            return this.element.find('.klevis-input-image-content');
        }

        get imageControl(){
            return this.element.find('.klevis-input-image-control')[0];
        }

        get imageVisible(){
            return this.element.find('.klevis-input-image-visible')[0];
        }

        createInput(){
            this.element
            .prepend(`
                <label class = 'klevis-input-label'></label>
                <div class = 'klevis-input--div'>
                    <input class = 'klevis-input' type = 'text'>
                    <div class = 'klevis-input-image-content'></div>
                    <img class = 'klevis-input-image-control' src = 'klevisInput/img/waiting.png'>
                </div>
            `)
            .wrapInner(`
                <div class = "klevis-input-content">
            `)
        }

        destroyInput(){
            this.element.find('.klevis-input-content').remove();
        }

        destroyRequired(){
            this.element.find('.klevis-valid').remove();
        }
    }

    class core{
        
        constructor(element, defaultData, data){
            
            this.htmlElements = new htmlElements(element);
            this.dataSource = new dataSource(defaultData, data);
            
            this.element = $(element);
            this.visibleState = false;

            this.init()
        }

        //Initialization
        init(){

            const that = this;

            this.htmlElements.createInput();
            
            if (this.dataSource.beforeOpen){
                const beforeOpen = this.dataSource.beforeOpen;
                beforeOpen(this);
            }

            if (this.dataSource.imageControl){
                this.imageControl = this.dataSource.imageControl;
            } else {
                this.imageControl = 'klevisInput/img/waiting.png';
            }

            if (!this.dataSource.displayImageControl){
                
                this.htmlElements.imageControl.remove();
            }

            this.refresh(); 
            this.initLabel();
            this.initInput();
            this.initEventListeners();



        }

        set labelHtml(value){
            this.htmlElements.label.innerHTML = value;
        }

        get labelHtml(){
            return this.htmlElements.label.innerHTML;
        }

        labelText(){
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
        set inputValue(value){
            this.htmlElements.input.value = value;
        }

        get inputValue(){
            return this.htmlElements.input.value;
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

        set imageControl(value){
            if (this.dataSource.displayImageControl){
                this.htmlElements.imageControl.src = value;
            }
        }

        get imageControl(){
            return this.htmlElements.imageControl.src;
        }

        set imageVisible(value){
            this.htmlElements.imageVisible.src = value;
        }

        get imageVisible(){
            return this.htmlElements.imageVisible.src;
        }

        initLabel(){
            let randomId;
            if (this.htmlElements.sender.id){
                randomId = this.htmlElements.sender.id;
            } else {
                randomId = Math.random().toString(36).substring(7);
            }
            this.htmlElements.label.setAttribute('for', `klevis-input-${randomId}`);
            this.htmlElements.input.setAttribute('id', `klevis-input-${randomId}`);
        }

        initInput(){
            let type;
            if (this.dataSource.type){
                type = this.dataSource.type;
            } else {
                type = this.dataSource.default.type;
            }
            this.htmlElements.input.type = type;

            if (type == 'password'){
                this.htmlElements.imageContent.prepend(`
                    <img class = 'klevis-input-image-visible' src = 'klevisInput/img/visible.png'>
                `);
            }
        }
        refresh(){

            this.labelText();

            //value
            if (this.dataSource.value){
                this.inputValue = this.dataSource.value;
            } else {
                this.inputValue = '';
            }

            
        }

        checkRequired(){
            //required
            if (this.dataSource.required ){

                this.htmlElements.inputDiv.classList.add('klevis-input-valid');
                this.imageControl = 'klevisInput/img/error.png';

                if (!this.htmlElements.valid){
                    this.htmlElements.inputContent.append(`<div class = 'klevis-valid'>
                        <span class="klevis-input-valid-text"></span>
                    </div>`)
                    this.htmlElements.label.classList.add('klevis-color-danger');
                    this.htmlElements.label.classList.remove('klevis-color-success');
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
                this.htmlElements.destroyRequired();
                this.htmlElements.inputDiv.classList.remove('klevis-input-valid');
                this.htmlElements.inputDiv.classList.add('klevis-input-valid-success');
                this.htmlElements.label.classList.add('klevis-color-success');
                this.htmlElements.label.classList.remove('klevis-color-danger');
                this.imageControl = 'klevisInput/img/success.png';
            }
        }

        initEventListeners(){

            const that = this;

            this.htmlElements.input.addEventListener('mouseover', e => {
                that.htmlElements.inputDiv.classList.add('klevis-input-activate')
            })
            
            this.htmlElements.input.addEventListener('mouseout', e => {
                that.htmlElements.inputDiv.classList.remove('klevis-input-activate')
            })
            
            if (this.dataSource.validOptions){
                const validOptions = this.dataSource.validOptions;
                validOptions(this);

                this.htmlElements.input.addEventListener('input', e => {
                    that.dataSource.validOptions(this);
                    that.checkRequired();
                })
                
                this.htmlElements.input.addEventListener('focus', e => {
                    that.dataSource.validOptions(this);
                    that.checkRequired();
                })
            } else {
                
                this.htmlElements.input.addEventListener('input', e => {

                    if (that.dataSource.change){
                        that.dataSource.change(that);
                    }

                    if (that.inputValue){
                        if (this.dataSource.changeImageControl){
                            that.imageControl = 'klevisInput/img/success.png';
                        }
                    } else {
                        if (that.dataSource.imageControl){
                            that.imageControl = that.dataSource.imageControl;
                        } else {
                            that.imageControl = 'klevisInput/img/waiting.png';
                        }
                    }
                })
            }

            if (this.dataSource.type == 'password'){
                this.htmlElements.imageVisible.addEventListener('click', e => {
                    if (!this.visibleState){
                        this.visibleState = true;
                        this.imageVisible = 'klevisInput/img/invisible.png';
                        this.htmlElements.input.type = 'text';
                    } else {
                        this.visibleState = false;
                        this.imageVisible = 'klevisInput/img/visible.png';
                        this.htmlElements.input.type = 'password';
                    }
                })
            }
        }

        focus(){
            this.htmlElements.input.focus({preventScroll:true});
        }
    }

    //data --> for data
    //methods --> for methods
    $.fn.klevisInput = function(data, methods) {
    
        let result = this;
        return this.each(function () {
            let klevisInput;
            if (!$(this).data('klevisInput')) {
                klevisInput = new core(this, $.fn.klevisInput.defaultData, data);
                //klevisInput.init();
                $(this).data('klevisInput', klevisInput);
            } else {
                klevisInput = $(this).data('klevisInput');
            }
            if ($.type(data) === 'string' && klevisInput[data] !== undefined && $.isFunction(klevisInput[data])) {
                result = klevisInput[data](methods);
            }
        });
        return result;
    };

    $.fn.klevisInput.defaultData = {
        label: '&nbsp;',
        type: 'text',
        displayImageControl: true
    };

}));

