function formatISO8601ToHHMM(iso8601DateTime) {
    const isoStringWithUTC = iso8601DateTime;

    const dateObj = new Date(isoStringWithUTC);
    dateObj.setUTCHours(dateObj.getUTCHours() + 7);
    const hours = String(dateObj.getUTCHours()).padStart(2, '0');
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
  
    return formattedTime;
  }
const compareDates = (date1, date2) => {
    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const day1 = date1.getDate();
  
    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();
  
    return year1 === year2 && month1 === month2 && day1 === day2;
  };

const formatDate = (inputDate) => {
    // Buat objek Date dari string tanggal
    const dateObject = new Date(inputDate);
  
    // Daftar nama bulan dalam bahasa Inggris
    const monthNames = [
      'Januari', 'Februari', 'Maret',
      'April', 'Mei', 'Juni', 'Juli',
      'Agustus', 'September', 'Oktober',
      'November', 'Desember'
    ];
  
    // Ambil informasi tanggal, bulan, dan tahun dari objek Date
    const day = dateObject.getDate();
    const monthIndex = dateObject.getMonth();
    const year = dateObject.getFullYear();
  
    // Konstruksi string dengan format yang diinginkan
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
  
    return formattedDate;
  };

  function toTimestamp(timeStr, dateStr) {
    // Dapatkan string datetime dalam format ISO 8601
    const iso8601DateTime = `${dateStr}T${timeStr}:00Z`;
  
    // Buat objek Date dari string iso8601DateTime

  
    return iso8601DateTime;
  }

  const formatDateToString = (dateObject) => {
    const monthNames = [
        'Januari', 'Februari', 'Maret',
        'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober',
        'November', 'Desember'
      ];
    
      // Ambil informasi tanggal, bulan, dan tahun dari objek Date
      const day = dateObject.getDate();
      const monthIndex = dateObject.getMonth();
      const year = dateObject.getFullYear();
    
      // Konstruksi string dengan format yang diinginkan
      const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
    
      return formattedDate;
  }

  function areDateStringEqual(dateString1, dateString2) {
    // Buat objek Date dari string tanggal pertama
    const date1 = new Date(dateString1);
    // Buat objek Date dari string tanggal kedua
    const date2 = new Date(dateString2);
  
    // Bandingkan kedua tanggal tanpa memperhatikan jam, menit, detik, dan milidetik
    const strippedDate1 = new Date(date1.toDateString());
    const strippedDate2 = new Date(date2.toDateString());
  
    return strippedDate1.getTime() === strippedDate2.getTime();
  }

  export{
    formatDate,
    formatISO8601ToHHMM
  }