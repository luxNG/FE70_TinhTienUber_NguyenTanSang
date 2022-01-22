var gThanhTien = 0;
var gSoKm = 0
var gThoiGianCho = 0;
var gLoaiXe = '';
// var soKmq = document.querySelector('form input:first-of-type');
// soKmq.setAttribute('id','soKm');
// alert()
var checkNumber = /^\d*$/;

// Hiện thông tin cước phí
document.getElementById("tinhTien").onclick = function () {
   var hienThiTien = document.getElementById('xuatTien');
   var hienThiBangThanhTien = document.getElementById('divThanhTien');
   var thanhTien = tinh_Tien();
   if (thanhTien > 0) {
      hienThiTien.innerHTML = thanhTien;
      hienThiBangThanhTien.style.display = "inline-block";
   }
}

// Tính tiền
function tinh_Tien() {
   var thanhTien = 0;
   var soKm = document.getElementById('soKM').value;
   // var soKm = soKmq.getAttribute('id').value;
   var thoiGianCho = document.getElementById('thoiGianCho').value;
   var loai_Xe = kiem_Tra_Xe();
   if (check_Is_Number(soKm) && check_Is_Time_Number(thoiGianCho)) {
      var tienThoiGianCho = thoi_Gian_Cho_Theo_Loai_Xe(loai_Xe);
      var giaTien = kiem_Tra_Tien_Theo_Loai_Xe(loai_Xe, soKm);
      thanhTien = (tienThoiGianCho * thoiGianCho) + (soKm * giaTien);
      gSoKm = soKm;
      gThoiGianCho = thoiGianCho;
      gThanhTien = thanhTien;
   }
   return thanhTien;
}

// Kiểm tra loại xe
function kiem_Tra_Xe() {
   var tenXe = '';
   var uberX = document.getElementById('uberX').checked;
   var uberSUV = document.getElementById('uberSUV').checked;
   var uberBlack = document.getElementById('uberBlack').checked;
   if (uberX) {
      tenXe = 'uberX';
   } else if (uberSUV) {
      tenXe = 'uberSUV';
   } else {
      tenXe = 'uberBlack';
   }
   return tenXe;
}

// Hiển thị giá tiền theo từng loại xe
function kiem_Tra_Tien_Theo_Loai_Xe(loai_Xe, soKm) {
   var giaTien = 0;
   if (loai_Xe === 'uberX') {
      gLoaiXe = 'uberX';
      if (soKm > 1 && soKm <= 20) {
         giaTien = 12000;
      } else if (soKm >= 21) {
         giaTien = 10000;
      } else {
         giaTien = 8000;
      }
   } else if (loai_Xe === 'uberSUV') {
      gLoaiXe = 'uberSUV';
      tienThoiGianCho = 3000
      if (soKm > 1 && soKm <= 20) {
         giaTien = 14000;
      } else if (soKm >= 21) {
         giaTien = 12000;
      } else {
         giaTien = 9000;
      }
   } else {
      gLoaiXe = 'uberBlack'
      if (soKm > 1 && soKm <= 20) {
         giaTien = 16000;
      } else if (soKm >= 21) {
         giaTien = 14000;
      } else {
         giaTien = 10000;
      }
   }
   return giaTien;
}

// Hiển thị thời gian chờ theo loại xe
function thoi_Gian_Cho_Theo_Loai_Xe(loai_Xe) {
   var tienThoiGianCho = 0;
   if (loai_Xe === 'uberX') {
      tienThoiGianCho = 2000;
   } else if (loai_Xe === 'uberSUV') {
      tienThoiGianCho = 3000;
   } else {
      tienThoiGianCho = 4000;
   }
   return tienThoiGianCho;
}

// Kiểm tra input đầu vào chỉ chấp nhận số và ko đc rỗng
function check_Is_Number(number) {
   var isCheck = true;
   var checkSoKM = document.getElementById('soKM').focus();
   if (!checkNumber.test(number)) {
      alert('nhập sai cú pháp chỉ chấp nhận đơn vị là số !!! ');
      // checkSoKM.focus();
      isCheck = false;
   } else if (number === "") {
      alert('Chưa có thông tin số km ');
      // checkSoKM.focus();
      isCheck = false;
   } else {
      isCheck = true;
   }
   return isCheck;
}

// Kiểm tra thời gian chờ input đầu vào chỉ chấp nhận số
function check_Is_Time_Number(number) {
   var isCheck = true;
   var time = document.getElementById('thoiGianCho').focus();
   if (!checkNumber.test(number)) {
      alert('nhập sai cú pháp chỉ chấp nhận đơn vị là số !!! ');
      // time.focus();
      isCheck = false;
   } else {
      isCheck = true;
   }
   return isCheck;
}

// in hóa đơn
document.getElementById('inHoaDon').onclick = function () {
   var bLoaiXe = document.getElementById('bLoaiXe');
   var bThoiGianCho = document.getElementById('bThoiGianCho');
   var bSoKm = document.getElementById('bSoKm');
   var bThanhTien = document.getElementById('bThanhTien');
   //  hiển thị ngày giờ
   hien_Thi_Ngay_Gio();
   bLoaiXe.innerHTML = gLoaiXe;
   bSoKm.innerHTML = gSoKm + ' km';
   if (gThoiGianCho != "") {
      bThoiGianCho.innerHTML = gThoiGianCho + ' p';
   } else {
      bThoiGianCho.innerHTML = 0 + ' p'
   }
   bThanhTien.innerHTML = gThanhTien + ' vnđ';
}

// Hiển Thị Ngày Giờ
function hien_Thi_Ngay_Gio() {
   var dateTime = new Date();
   var ngay = dateTime.getDate() + ' / ' + ("0" + (dateTime.getMonth() + 1)).slice(-2) + ' / ' + dateTime.getFullYear();
   document.getElementById('ngay').innerHTML = ngay;
   var am_pm = dateTime.getHours() >= 12 ? "PM" : "AM";
   var gio = ("0" + dateTime.getHours()).slice(-2) + ':' + ("0" + dateTime.getMinutes()).slice(-2) + ' ' + am_pm;
   document.getElementById('gio').innerHTML = gio;
}
