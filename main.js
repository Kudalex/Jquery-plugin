document.addEventListener('DOMContentLoaded', function () {

	$('#test').slider({
		items: [
			{
				src: 'img/1.jpg',
				title: 'Test1',
				sort: 3
			},
			{
				src: 'img/2.jpg',
				title: 'Test2',
				sort: 2
			},
			{
				src: 'img/3.jpg',
				title: 'Test3',
				sort: 3
			},
			{
				src: 'img/4.jpg',
				title: 'Test4',
				sort: 6
			},
			{
				src: 'img/5.jpg',
				title: 'Test5',
				sort: 10
			},
			{
				src: 'img/6.jpg',
				title: 'Test6',
				sort: 1
			},
			{
				src: 'img/7.jpg',
				title: {
					'ua': 'Тест 7',
					'en': 'Test 7'
				},
				sort: 7,
				description: {
					'ua': 'аллала',
					'en': 'lalallala'
				}
			},
			{
				src: 'img/8.jpg',
				title: 'Test8',
				sort: 8,
				description: 'Будь-яке виробництво складається з Технологічних процесів, які уявляють собою дерево та утворюють основні процеси, які присутні на підприємстві. Завдяки опису саме їх отримуємо загальну уяву про виробництво продукції, яке починається з видачі сировини у виробництво та її перетворення у напівфабрикати на різних дільницях.'

			},
			{
				src: 'img/9.jpg',
				sort: 0,
				description: {
					'ua': 'Будь-яке виробництво складається з Технологічних процесів, які уявляють собою дерево та утворюють основні процеси, які присутні на підприємстві. Завдяки опису саме їх отримуємо загальну уяву про виробництво продукції, яке починається з видачі сировини у виробництво та її перетворення у напівфабрикати на різних дільницях.',
					'en': 'test'
				}

			},
			{
				src: '',
				title: 'Test10',
				sort: 1
			},
		],
		playState: 0,
		playDelay: 1000,
		beforeOpen: (options) => {
			options.dataSource.lang = 'ua';
		}
	})

	$('#test2').slider({
		items: [
			{
				src: 'img/1.jpg',
				title: 'Test1'
			},
			{
				src: 'img/2.jpg',
				title: 'Test2'
			},
			{
				src: 'img/3.jpg',
				title: 'Test3'
			},
			{
				src: 'img/4.jpg',
				title: 'Test4'
			},
			{
				src: 'img/5.jpg',
				title: 'Test5'
			},
			{
				src: 'img/6.jpg',
				title: 'Test6'
			},
			{
				src: 'img/7.jpg',
				title: 'Test7'
			},
		]
	})

	$('#testInput1').klevisInput({
		
		label: {
			'ru': 'Первый инпут',
			'ua': 'Перший інпут',
			'en': 'First input'
		},
		type: 'password',
		lang: 'ru',

		beforeOpen: (options) => {
		},
		
		validOptions: (options) => {

			if (!options.inputValue){
		
				options.required = true;
				options.validText = {
					'ru': 'Обязательное поле',
					'ua': 'Обов’язкове поле',
					'en': 'Required field'
				};

			} else if (options.inputValue.length < 5){
		
				options.required = true;
				options.validText = 'you must have at least 5 characters'
				
			} else {
				options.required = false;
			}
		}

	})

	$('#testInput2').klevisInput({
		
		label: {
			'ru': 'Второй инпут',
			'eng': 'Second input'
		},
		value: 123,
		beforeOpen: (options) => {
		},
		
		validText: {
			'ru': 'Обов’язкове поле',
			'eng': 'Required field'
		},
		lang: 'eng',
		
		validOptions: (options) => {
			if (!options.inputValue){
				options.required = true;
			} else {
				options.required = false;
			}
		}

	})

	
	$('#testInput3').klevisInput({
		label: 'test input 4',
		displayImageControl: false
	})

	$('#testInput4').klevisInput({
		imageControl: `/img/2.jpg`,
		change: (options) => {
			console.log(options.inputValue)
		},
	})

	
	$('#testInput5').klevisInput({
		changeImageControl: true
	})


	//https://myjson.com
	$('.testSelectList1').klevisSelectList({
		//label: '',
		textField: 'name',
		valueField: 'abbreviation',
		autoRead: false,
		filter: true,
		//textField: 'text',
		//valueField: 'value',
		source: {
			// items : [{
			// 	text: 'test1',
			// 	value: 1
			// }, {
			// 	text: 'test2',
			// 	value: 2
			// }, {
			// 	text: 'test3',
			// 	value: 3
			// }]
			
			transport(options){
				$.ajax({
					type: "GET",
					url: "https://api.myjson.com/bins/bnx96",
					//url: "https://api.myjson.com/bins/104u7u",
					success: (data) => {
						options.success(data);
					}
				});
			}
		},
		change(options){
			//console.log(options);
		}

	})

}, false);