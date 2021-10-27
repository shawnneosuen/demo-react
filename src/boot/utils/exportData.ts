import * as XLSX from 'xlsx'

export const handleExportAll = (data: any[]) => {
	const sheet = XLSX.utils.json_to_sheet(data)

	openDownloadDialog(sheet2blob(sheet, undefined), `全部信息.xlsx`)
}
const openDownloadDialog = (url: Object, saveName: string) => {
	let urlStr: string = ''
	if (typeof url == 'object' && url instanceof Blob) {
		urlStr = URL.createObjectURL(url) // 创建blob地址
	}
	var aLink = document.createElement('a')
	aLink.href = urlStr
	aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
	var event
	if (window.MouseEvent) event = new MouseEvent('click')
	else {
		event = document.createEvent('MouseEvents')
		event.initMouseEvent(
			'click',
			true,
			false,
			window,
			0,
			0,
			0,
			0,
			0,
			false,
			false,
			false,
			false,
			0,
			null
		)
	}
	aLink.dispatchEvent(event)
}

const sheet2blob = (sheet: XLSX.WorkSheet, sheetName: string | undefined) => {
	sheetName = sheetName || 'sheet1'
	let workbook: XLSX.WorkBook = {
		SheetNames: [sheetName],
		Sheets: {},
	}
	workbook.Sheets[sheetName] = sheet // 生成excel的配置项

	var wopts: XLSX.WritingOptions = {
		bookType: 'xlsx', // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: 'binary',
	}
	var wbout = XLSX.write(workbook, wopts)
	var blob = new Blob([s2ab(wbout)], {
		type: 'application/octet-stream',
	}) // 字符串转ArrayBuffer
	function s2ab(s: string) {
		var buf = new ArrayBuffer(s.length)
		var view = new Uint8Array(buf)
		for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
		return buf
	}

	return blob
}
