// Global variables
let currentUniversity = null;
let currentStore = null;
let cart = [];
let currentCategory = 'all';

// Drink images mapping - URLs from Unsplash (chính xác với tên món)
const drinkImages = {
    // Coffee - Cà phê
    'Cà phê đen': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
    'Cà phê sữa': 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop',
    'Cà phê sữa đá': 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop',
    'Cà phê sữa nóng': 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=400&h=400&fit=crop',
    'Cà phê nâu': 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop',
    'Cà phê phin': 'https://images.unsplash.com/photo-1562207053-6de9cdcfcc3f?w=400&h=400&fit=crop',
    'Cappuccino': 'https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?w=400&h=400&fit=crop',
    'Espresso': 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400&h=400&fit=crop',
    'Americano': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    'Latte': 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=400&fit=crop',
    'Mocha': 'https://images.unsplash.com/photo-1578374173ias-00af2a8bf578?w=400&h=400&fit=crop',
    'Macchiato': 'https://images.unsplash.com/photo-1557772611-722dabe20327?w=400&h=400&fit=crop',
    'Cà phê đá xay': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
    'Frappuccino': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop',
    
    // Tea & Milk Tea - Trà
    'Trà đen': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop',
    'Trà xanh': 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop',
    'Trà hoa cúc': 'https://images.unsplash.com/photo-1597318209582-7b583b6f079f?w=400&h=400&fit=crop',
    'Trà sữa trân châu': 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=400&fit=crop',
    'Trà sữa matcha': 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop',
    'Trà sữa thái': 'https://images.unsplash.com/photo-1558857563-8b2e097d42bb?w=400&h=400&fit=crop',
    'Trà sữa socola': 'https://images.unsplash.com/photo-1578374173703-00af2a8bf578?w=400&h=400&fit=crop',
    'Trà sữa trân châu đường đen': 'https://images.unsplash.com/photo-1558857563-8b2e097d42bb?w=400&h=400&fit=crop',
    'Trà sữa dâu tây': 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=400&fit=crop',
    'Trà sữa trân châu socola': 'https://images.unsplash.com/photo-1578374173703-00af2a8bf578?w=400&h=400&fit=crop',
    'Trà sữa trân châu dâu': 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=400&fit=crop',
    
    // Smoothie - Sinh tố
    'Sinh tố bơ': 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=400&fit=crop',
    'Sinh tố dâu': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=400&fit=crop',
    'Sinh tố dâu tây': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=400&fit=crop',
    'Sinh tố xoài': 'https://images.unsplash.com/photo-1600101804734-2da3c7c08938?w=400&h=400&fit=crop',
    'Sinh tố chuối': 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=400&fit=crop',
    'Sinh tố dưa hấu': 'https://images.unsplash.com/photo-1589938623695-4557e8a3f6c5?w=400&h=400&fit=crop',
    'Sinh tố dứa': 'https://images.unsplash.com/photo-1587574293340-e0011c34e8f1?w=400&h=400&fit=crop',
    'Sinh tố kiwi': 'https://images.unsplash.com/photo-1619566636857-23d0083b9f55?w=400&h=400&fit=crop',
    'Sinh tố dừa': 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&h=400&fit=crop',
    'Sinh tố bơ dừa': 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=400&fit=crop',
    'Sinh tố xoài dứa': 'https://images.unsplash.com/photo-1600101804734-2da3c7c08938?w=400&h=400&fit=crop',
    'Sinh tố chuối dâu': 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=400&fit=crop',
    'Sinh tố rau xanh': 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=400&fit=crop',
    
    // Juice - Nước ép
    'Nước ép cam': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop',
    'Nước ép cam tươi': 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
    'Nước ép táo': 'https://images.unsplash.com/photo-1576673442212-744f7cb002b6?w=400&h=400&fit=crop',
    'Nước ép táo xanh': 'https://images.unsplash.com/photo-1572594328937-f16c94998a05?w=400&h=400&fit=crop',
    'Nước ép dưa hấu': 'https://images.unsplash.com/photo-1629194303177-d5d3a3f2e17f?w=400&h=400&fit=crop',
    'Nước ép cà rốt': 'https://images.unsplash.com/photo-1600281877611-16f03b0c0ceb?w=400&h=400&fit=crop',
    'Nước ép cà chua': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    
    // Default images for categories
    'default-coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
    'default-tea': 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400&h=400&fit=crop',
    'default-smoothie': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=400&fit=crop',
    'default-juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop',
    // Food - Đồ ăn (mặc định)
    'default-food': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop',
    // Food images (tên món -> ảnh riêng)
    'Bánh mì thịt': 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=400&fit=crop',
    'Cơm gà': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop',
    'Mì xào bò': 'https://images.unsplash.com/photo-1544025162-8e8d44d6f8d1?w=400&h=400&fit=crop',
    'Gà rán': 'https://images.unsplash.com/photo-1604908812713-9b1d565a1e5f?w=400&h=400&fit=crop',
    'Khoai tây chiên': 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=400&h=400&fit=crop',
    'Salad rau trộn': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop',
    'Phở bò': 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=400&h=400&fit=crop',
    'Bún chả': 'https://images.unsplash.com/photo-1617195737496-2dfc9c2b63a3?w=400&h=400&fit=crop',
    'Cơm tấm sườn': 'https://images.unsplash.com/photo-1598866594230-2f1b98e65ce0?w=400&h=400&fit=crop',
    'Bánh mì ốp la': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop',
    'Mì xào hải sản': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=400&fit=crop',
    'Salad Caesar': 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=400&fit=crop'
};

// Function to normalize text (remove Vietnamese diacritics and lowercase)
function normalizeText(text) {
    return (text || '')
        .toString()
        .normalize('NFD')
        .replace(/\p{Diacritic}+/gu, '')
        .toLowerCase();
}

// Keyword-based image resolver to cover all names
function getImageByKeywords(name, category) {
    const n = normalizeText(name);

    // Coffee
    if (category === 'coffee' || /(ca phe|espresso|americano|latte|cappuccino|macchiato|mocha|phin|nau|sua|da xay|frappuccino)/.test(n)) {
        if (/espresso/.test(n)) return 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400&h=400&fit=crop';
        if (/americano/.test(n)) return 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop';
        if (/latte/.test(n)) return 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=400&fit=crop';
        if (/cappuccino/.test(n)) return 'https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?w=400&h=400&fit=crop';
        if (/macchiato/.test(n)) return 'https://images.unsplash.com/photo-1557772611-722dabe20327?w=400&h=400&fit=crop';
        if (/mocha/.test(n)) return 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?w=400&h=400&fit=crop';
        if (/(da xay|frappuccino)/.test(n)) return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop';
        if (/(sua|nau)/.test(n)) return 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop';
        if (/(phin|den)/.test(n)) return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop';
        return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop';
    }

    // Tea & Milk Tea
    if (category === 'tea' || /(tra sua|matcha|thai|tra den|tra xanh|hoa cuc|socola|duong den|tran chau|bubble tea)/.test(n)) {
        if (/matcha/.test(n)) return 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop';
        if (/thai/.test(n)) return 'https://images.unsplash.com/photo-1558857563-8b2e097d42bb?w=400&h=400&fit=crop';
        if (/socola/.test(n)) return 'https://images.unsplash.com/photo-1578374173703-00af2a8bf578?w=400&h=400&fit=crop';
        if (/(duong den|tran chau|bubble tea|tra sua)/.test(n)) return 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=400&fit=crop';
        if (/tra den/.test(n)) return 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop';
        if (/tra xanh/.test(n)) return 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop';
        if (/hoa cuc/.test(n)) return 'https://images.unsplash.com/photo-1597318209582-7b583b6f079f?w=400&h=400&fit=crop';
        return 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400&h=400&fit=crop';
    }

    // Smoothie
    if (category === 'smoothie' || /(sinh to|smoothie|shake)/.test(n)) {
        if (/bo/.test(n)) return 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=400&fit=crop';
        if (/(dau tay|dau)/.test(n)) return 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=400&fit=crop';
        if (/xoai/.test(n)) return 'https://images.unsplash.com/photo-1600101804734-2da3c7c08938?w=400&h=400&fit=crop';
        if (/chuoi/.test(n)) return 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=400&fit=crop';
        if (/dua(?! hau)/.test(n)) return 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&h=400&fit=crop';
        if (/kiwi/.test(n)) return 'https://images.unsplash.com/photo-1619566636857-23d0083b9f55?w=400&h=400&fit=crop';
        if (/(rau xanh|green)/.test(n)) return 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=400&fit=crop';
        return 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=400&fit=crop';
    }

    // Juice
    if (category === 'juice' || /(nuoc ep|juice)/.test(n)) {
        if (/cam/.test(n)) return 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop';
        if (/tao/.test(n)) return 'https://images.unsplash.com/photo-1576673442212-744f7cb002b6?w=400&h=400&fit=crop';
        if (/(dua hau)/.test(n)) return 'https://images.unsplash.com/photo-1629194303177-d5d3a3f2e17f?w=400&h=400&fit=crop';
        if (/(ca rot)/.test(n)) return 'https://images.unsplash.com/photo-1600281877611-16f03b0c0ceb?w=400&h=400&fit=crop';
        if (/(ca chua)/.test(n)) return 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop';
        if (/dua/.test(n)) return 'https://images.unsplash.com/photo-1587574293340-e0011c34e8f1?w=400&h=400&fit=crop';
        if (/oi/.test(n)) return 'https://images.unsplash.com/photo-1566843972141-883c6dd85f06?w=400&h=400&fit=crop';
        if (/nho/.test(n)) return 'https://images.unsplash.com/photo-1540132328-79bd2b6a1a9b?w=400&h=400&fit=crop';
        return 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop';
    }

    // Food
    if (category === 'food' || /(banh mi|com|mi xao|ga ran|khoai tay chien|salad|pho|bun cha|op la|hai san|caesar)/.test(n)) {
        if (/banh mi/.test(n) && /op la/.test(n)) return 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop';
        if (/banh mi/.test(n)) return 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=400&fit=crop';
        if (/(com ga)/.test(n)) return 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop';
        if (/(mi xao hai san)/.test(n)) return 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=400&fit=crop';
        if (/(mi xao|xao bo)/.test(n)) return 'https://images.unsplash.com/photo-1544025162-8e8d44d6f8d1?w=400&h=400&fit=crop';
        if (/(ga ran)/.test(n)) return 'https://images.unsplash.com/photo-1604908812713-9b1d565a1e5f?w=400&h=400&fit=crop';
        if (/(khoai tay chien)/.test(n)) return 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=400&h=400&fit=crop';
        if (/(salad caesar)/.test(n)) return 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=400&fit=crop';
        if (/(salad)/.test(n)) return 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop';
        if (/(pho bo|pho)/.test(n)) return 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=400&h=400&fit=crop';
        if (/(bun cha)/.test(n)) return 'https://images.unsplash.com/photo-1617195737496-2dfc9c2b63a3?w=400&h=400&fit=crop';
        if (/(com tam|suon)/.test(n)) return 'https://images.unsplash.com/photo-1598866594230-2f1b98e65ce0?w=400&h=400&fit=crop';
        return 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop';
    }

    return null;
}

// Function to get drink image URL
function getDrinkImage(name, category) {
    if (drinkImages[name]) {
        return drinkImages[name];
    }
    const keywordUrl = getImageByKeywords(name, category);
    if (keywordUrl) {
        return keywordUrl;
    }
    return drinkImages[`default-${category}`] || drinkImages['default-coffee'];
}

// University data
const universities = [
    {
        id: 1,
        name: "Đại học Bách Khoa Hà Nội",
        shortName: "Bách Khoa",
        icon: "🏛️",
        logo: "logos/bach-khoa.png",
        description: "Trường đại học kỹ thuật hàng đầu Việt Nam",
        studentCount: "45,000+",
        storeCount: "6",
        location: "Hai Bà Trưng, Hà Nội"
    },
    {
        id: 2,
        name: "Đại học Kinh tế Quốc dân",
        shortName: "NEU",
        icon: "📊",
        logo: "logos/neu.png",
        description: "Trường đại học kinh tế uy tín",
        studentCount: "35,000+",
        storeCount: "6",
        location: "Hai Bà Trưng, Hà Nội"
    },
    {
        id: 3,
        name: "Đại học Ngoại thương",
        shortName: "FTU",
        icon: "🌍",
        logo: "logos/ftu.png",
        description: "Trường đại học thương mại quốc tế",
        studentCount: "25,000+",
        storeCount: "6",
        location: "Cầu Giấy, Hà Nội"
    },
    {
        id: 4,
        name: "Đại học Quốc gia Hà Nội",
        shortName: "VNU",
        icon: "🎓",
        logo: "logos/vnu.png",
        description: "Hệ thống đại học quốc gia hàng đầu Việt Nam",
        studentCount: "50,000+",
        storeCount: "6",
        location: "Cầu Giấy, Hà Nội"
    },
    {
        id: 5,
        name: "Đại học Sư phạm Hà Nội",
        shortName: "SPHN",
        icon: "📚",
        logo: "logos/sphn.png",
        description: "Trường đại học sư phạm hàng đầu",
        studentCount: "30,000+",
        storeCount: "6",
        location: "Cầu Giấy, Hà Nội"
    },
    {
        id: 6,
        name: "Đại học Y Hà Nội",
        shortName: "HMU",
        icon: "⚕️",
        logo: "logos/hmu.jpg",
        description: "Trường đại học y khoa uy tín",
        studentCount: "20,000+",
        storeCount: "6",
        location: "Đống Đa, Hà Nội"
    },
    {
        id: 7,
        name: "Đại học Công nghệ",
        shortName: "UET",
        icon: "💻",
        logo: "logos/uet.png",
        description: "Trường đại học công nghệ thông tin",
        studentCount: "15,000+",
        storeCount: "6",
        location: "Cầu Giấy, Hà Nội"
    },
    {
        id: 8,
        name: "Đại học Thương mại",
        shortName: "TUC",
        icon: "🏪",
        logo: "logos/tuc.jpg",
        description: "Trường đại học thương mại và kinh doanh",
        studentCount: "28,000+",
        storeCount: "6",
        location: "Cầu Giấy, Hà Nội"
    },
    {
        id: 9,
        name: "Đại học Luật Hà Nội",
        shortName: "HUL",
        icon: "⚖️",
        logo: "logos/hul.png",
        description: "Trường đại học luật hàng đầu",
        studentCount: "18,000+",
        storeCount: "6",
        location: "Đống Đa, Hà Nội"
    },
    {
        id: 10,
        name: "Đại học Kiến trúc Hà Nội",
        shortName: "HAU",
        icon: "🏗️",
        logo: "logos/hau.png",
        description: "Trường đại học kiến trúc và xây dựng",
        studentCount: "12,000+",
        storeCount: "6",
        location: "Thanh Xuân, Hà Nội"
    },
    {
        id: 11,
        name: "Đại học Mỹ thuật Việt Nam",
        shortName: "VNUFA",
        icon: "🎨",
        logo: "logos/vnufa.png",
        description: "Trường đại học mỹ thuật và nghệ thuật",
        studentCount: "8,000+",
        storeCount: "6",
        location: "Hai Bà Trưng, Hà Nội"
    },
    {
        id: 12,
        name: "Đại học Sư Phạm Thể Dục Thể Thao ",
        shortName: "UST",
        icon: "🏃",
        logo: "logos/ust.png",
        description: "Trường đại học thể thao và du lịch",
        studentCount: "10,000+",
        storeCount: "6",
        location: "Từ Liêm, Hà Nội"
    }
];

// Store data - mỗi trường có 6 cửa hàng, mỗi cửa hàng có 10 món chia đều các loại
const stores = [
    // ĐH Bách Khoa - 6 cửa hàng
    {
        id: 1,
        name: "Café Sinh Viên BK",
        description: "Cà phê truyền thống Hà Nội cho sinh viên BK",
        rating: 4.5,
        deliveryTime: "15-20 phút",
        location: "Phố Đại Cồ Việt, Hai Bà Trưng",
        universityId: 1,
        menu: [
            // Coffee (3 món)
            { id: 1, name: "Cà phê đen", price: 15000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
            { id: 2, name: "Cà phê sữa", price: 20000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
            { id: 3, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            // Tea (3 món)
            { id: 4, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 5, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 6, name: "Trà sữa thái", price: 22000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 7, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 8, name: "Sinh tố dâu", price: 35000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 9, name: "Nước ép cam", price: 18000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
            { id: 10, name: "Nước ép táo", price: 20000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
        ]
    },
    {
        id: 2,
        name: "BK Coffee House",
        description: "Cà phê specialty phong cách Hà Nội",
        rating: 4.8,
        deliveryTime: "20-25 phút",
        location: "Phố Đại Cồ Việt, Hai Bà Trưng",
        universityId: 1,
        menu: [
            // Coffee (3 món)
            { id: 11, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 12, name: "Americano", price: 30000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            { id: 13, name: "Latte", price: 40000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
            // Tea (3 món)
            { id: 14, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
            { id: 15, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
            { id: 16, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 17, name: "Sinh tố xoài", price: 32000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
            { id: 18, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 19, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 20, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    {
        id: 3,
        name: "BK Bubble Tea",
        description: "Trà sữa trân châu phong cách Hà Nội",
        rating: 4.3,
        deliveryTime: "15-20 phút",
        location: "Phố Đại Cồ Việt, Hai Bà Trưng",
        universityId: 1,
        menu: [
            // Coffee (2 món)
            { id: 21, name: "Mocha", price: 45000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
            { id: 22, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
            // Tea (3 món)
            { id: 23, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 24, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            { id: 25, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
            // Smoothie (3 món)
            { id: 26, name: "Sinh tố dưa hấu", price: 28000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
            { id: 27, name: "Sinh tố dứa", price: 30000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
            { id: 28, name: "Sinh tố kiwi", price: 40000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
            // Juice (2 món)
            { id: 29, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 30, name: "Nước ép cà chua", price: 20000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" }
        ]
    },
    {
        id: 4,
        name: "BK Smoothie Corner",
        description: "Sinh tố và nước ép tươi Hà Nội",
        rating: 4.7,
        deliveryTime: "12-18 phút",
        location: "Phố Đại Cồ Việt, Hai Bà Trưng",
        universityId: 1,
        menu: [
            // Coffee (2 món)
            { id: 31, name: "Cà phê đá xay", price: 35000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
            { id: 32, name: "Frappuccino", price: 42000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 33, name: "Trà sữa trân châu socola", price: 35000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
            { id: 34, name: "Trà sữa trân châu dâu", price: 32000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
            // Smoothie (3 món)
            { id: 35, name: "Sinh tố dừa", price: 35000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
            { id: 36, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
            { id: 37, name: "Sinh tố bơ dừa", price: 38000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
            // Juice (3 món)
            { id: 38, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" },
            { id: 39, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 40, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
        ]
    },
    {
        id: 5,
        name: "BK Fresh Juice Bar",
        description: "Nước ép tươi ngon Hà Nội",
        rating: 4.6,
        deliveryTime: "10-15 phút",
        location: "Phố Đại Cồ Việt, Hai Bà Trưng",
        universityId: 1,
        menu: [
            // Coffee (2 món)
            { id: 41, name: "Cà phê sữa đá", price: 18000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
            { id: 42, name: "Cà phê nâu", price: 22000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 43, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 44, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 45, name: "Sinh tố xoài dứa", price: 35000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
            { id: 46, name: "Sinh tố chuối dâu", price: 30000, description: "Sinh tố chuối dâu thơm ngon", category: "smoothie", image: "🍌" },
            // Juice (4 món)
            { id: 47, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 48, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" },
            { id: 49, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 50, name: "Nước ép cà chua", price: 20000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" }
        ]
    },
    {
        id: 6,
        name: "BK Tea Garden",
        description: "Trà truyền thống và hiện đại Hà Nội",
        rating: 4.5,
        deliveryTime: "12-18 phút",
        location: "Phố Đại Cồ Việt, Hai Bà Trưng",
        universityId: 1,
        menu: [
            // Coffee (2 món)
            { id: 51, name: "Cà phê phin", price: 20000, description: "Cà phê phin truyền thống", category: "coffee", image: "☕" },
            { id: 52, name: "Cà phê sữa nóng", price: 22000, description: "Cà phê sữa nóng ấm áp", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 53, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
            { id: 54, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
            { id: 55, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
            { id: 56, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 57, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
            { id: 58, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            // Juice (2 món)
            { id: 59, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" },
            { id: 60, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" }
        ]
    },
    // ĐH Kinh tế Quốc dân - 6 cửa hàng
    {
        id: 7,
        name: "NEU Café",
        description: "Cà phê truyền thống Hà Nội cho sinh viên NEU",
        rating: 4.4,
        deliveryTime: "12-18 phút",
        location: "Phố Giải Phóng, Hai Bà Trưng",
        universityId: 2,
        menu: [
            // Coffee (3 món)
            { id: 61, name: "Cà phê đen", price: 16000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
            { id: 62, name: "Cà phê sữa", price: 20000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
            { id: 63, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            // Tea (3 món)
            { id: 64, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 65, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 66, name: "Trà sữa thái", price: 22000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 67, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 68, name: "Sinh tố dâu", price: 35000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 69, name: "Nước ép cam", price: 18000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
            { id: 70, name: "Nước ép táo", price: 20000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
        ]
    },
    {
        id: 8,
        name: "NEU Tea House",
        description: "Trà và đồ uống nhẹ phong cách Hà Nội",
        rating: 4.6,
        deliveryTime: "10-15 phút",
        location: "Phố Giải Phóng, Hai Bà Trưng",
        universityId: 2,
        menu: [
            // Coffee (2 món)
            { id: 71, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 72, name: "Americano", price: 30000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 73, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
            { id: 74, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
            { id: 75, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 76, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
            // Smoothie (2 món)
            { id: 77, name: "Sinh tố xoài", price: 32000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
            { id: 78, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 79, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 80, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    {
        id: 9,
        name: "Smoothie Paradise NEU",
        description: "Sinh tố đa dạng",
        rating: 4.5,
        deliveryTime: "15-20 phút",
        location: "Phố Giải Phóng, Hai Bà Trưng",
        universityId: 2,
        menu: [
            // Coffee (2 món)
            { id: 81, name: "Latte", price: 40000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
            { id: 82, name: "Mocha", price: 45000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 83, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 84, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            // Smoothie (4 món)
            { id: 85, name: "Sinh tố dưa hấu", price: 28000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
            { id: 86, name: "Sinh tố dứa", price: 30000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
            { id: 87, name: "Sinh tố kiwi", price: 40000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
            { id: 88, name: "Sinh tố dừa", price: 35000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
            // Juice (2 món)
            { id: 89, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 90, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
        ]
    },
    {
        id: 10,
        name: "Fresh Juice Bar NEU",
        description: "Nước ép tươi ngon",
        rating: 4.3,
        deliveryTime: "8-12 phút",
        location: "Phố Giải Phóng, Hai Bà Trưng",
        universityId: 2,
        menu: [
            // Coffee (2 món)
            { id: 91, name: "Cà phê đá xay", price: 35000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
            { id: 92, name: "Frappuccino", price: 42000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 93, name: "Trà sữa trân châu socola", price: 35000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
            { id: 94, name: "Trà sữa trân châu dâu", price: 32000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 95, name: "Sinh tố bơ dừa", price: 38000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
            { id: 96, name: "Sinh tố chuối dâu", price: 30000, description: "Sinh tố chuối dâu thơm ngon", category: "smoothie", image: "🍌" },
            // Juice (4 món)
            { id: 97, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 98, name: "Nước ép cà chua", price: 20000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" },
            { id: 99, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" },
            { id: 100, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
        ]
    },
    {
        id: 11,
        name: "Coffee Lab NEU",
        description: "Cà phê specialty",
        rating: 4.7,
        deliveryTime: "18-25 phút",
        location: "Phố Giải Phóng, Hai Bà Trưng",
        universityId: 2,
        menu: [
            // Coffee (4 món)
            { id: 101, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 102, name: "Americano", price: 28000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            { id: 103, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            { id: 104, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 105, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 106, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 107, name: "Sinh tố xoài dứa", price: 35000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
            { id: 108, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 109, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 110, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
        ]
    },
    {
        id: 12,
        name: "Bubble Tea NEU",
        description: "Trà sữa trân châu đa dạng",
        rating: 4.2,
        deliveryTime: "12-18 phút",
        location: "Phố Giải Phóng, Hai Bà Trưng",
        universityId: 2,
        menu: [
            // Coffee (2 món)
            { id: 111, name: "Cà phê sữa đá", price: 18000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
            { id: 112, name: "Cà phê nâu", price: 22000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 113, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 114, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 115, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 116, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 117, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 118, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 119, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 120, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    // ĐH Ngoại thương - 6 cửa hàng
    {
        id: 13,
        name: "Café FTU",
        description: "Cà phê cho sinh viên ngoại thương",
        rating: 4.6,
        deliveryTime: "15-20 phút",
        location: "Gần ĐH Ngoại Thương",
        universityId: 3,
        menu: [
            // Coffee (3 món)
            { id: 121, name: "Cà phê đen", price: 17000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
            { id: 122, name: "Cà phê sữa", price: 21000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
            { id: 123, name: "Cappuccino", price: 36000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            // Tea (3 món)
            { id: 124, name: "Trà sữa trân châu", price: 26000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 125, name: "Trà sữa matcha", price: 31000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 126, name: "Trà sữa thái", price: 23000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 127, name: "Sinh tố bơ", price: 31000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 128, name: "Sinh tố dâu", price: 36000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 129, name: "Nước ép cam", price: 19000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
            { id: 130, name: "Nước ép táo", price: 21000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
        ]
    },
    {
        id: 14,
        name: "Tea House FTU",
        description: "Trà và đồ uống nhẹ",
        rating: 4.7,
        deliveryTime: "10-15 phút",
        location: "Gần ĐH Ngoại Thương",
        universityId: 3,
        menu: [
            // Coffee (2 món)
            { id: 131, name: "Espresso", price: 26000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 132, name: "Americano", price: 31000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 133, name: "Trà đen", price: 16000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
            { id: 134, name: "Trà xanh", price: 19000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
            { id: 135, name: "Trà sữa socola", price: 26000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 136, name: "Trà hoa cúc", price: 21000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
            // Smoothie (2 món)
            { id: 137, name: "Sinh tố xoài", price: 33000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
            { id: 138, name: "Sinh tố chuối", price: 26000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 139, name: "Nước ép dưa hấu", price: 19000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 140, name: "Nước ép cà rốt", price: 21000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    {
        id: 15,
        name: "Smoothie Paradise FTU",
        description: "Sinh tố đa dạng",
        rating: 4.6,
        deliveryTime: "15-20 phút",
        location: "Gần ĐH Ngoại Thương",
        universityId: 3,
        menu: [
            // Coffee (2 món)
            { id: 141, name: "Latte", price: 41000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
            { id: 142, name: "Mocha", price: 46000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 143, name: "Trà sữa trân châu đường đen", price: 29000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 144, name: "Trà sữa dâu tây", price: 31000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            // Smoothie (4 món)
            { id: 145, name: "Sinh tố dưa hấu", price: 29000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
            { id: 146, name: "Sinh tố dứa", price: 31000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
            { id: 147, name: "Sinh tố kiwi", price: 41000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
            { id: 148, name: "Sinh tố dừa", price: 36000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
            // Juice (2 món)
            { id: 149, name: "Nước ép cam tươi", price: 26000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 150, name: "Nước ép táo xanh", price: 23000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
        ]
    },
    {
        id: 16,
        name: "Fresh Juice Bar FTU",
        description: "Nước ép tươi ngon",
        rating: 4.4,
        deliveryTime: "8-12 phút",
        location: "Gần ĐH Ngoại Thương",
        universityId: 3,
        menu: [
            // Coffee (2 món)
            { id: 151, name: "Cà phê đá xay", price: 36000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
            { id: 152, name: "Frappuccino", price: 43000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 153, name: "Trà sữa trân châu socola", price: 36000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
            { id: 154, name: "Trà sữa trân châu dâu", price: 33000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 155, name: "Sinh tố bơ dừa", price: 39000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
            { id: 156, name: "Sinh tố chuối dâu", price: 31000, description: "Sinh tố chuối dâu thơm ngon", category: "smoothie", image: "🍌" },
            // Juice (4 món)
            { id: 157, name: "Nước ép dưa hấu", price: 19000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 158, name: "Nước ép cà chua", price: 21000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" },
            { id: 159, name: "Nước ép cà rốt", price: 21000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" },
            { id: 160, name: "Nước ép dưa hấu", price: 19000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
        ]
    },
    {
        id: 17,
        name: "Coffee Lab FTU",
        description: "Cà phê specialty",
        rating: 4.8,
        deliveryTime: "18-25 phút",
        location: "Gần ĐH Ngoại Thương",
        universityId: 3,
        menu: [
            // Coffee (4 món)
            { id: 161, name: "Espresso", price: 26000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 162, name: "Americano", price: 29000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            { id: 163, name: "Cappuccino", price: 36000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            { id: 164, name: "Macchiato", price: 41000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 165, name: "Trà sữa matcha", price: 31000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 166, name: "Trà sữa thái", price: 25000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 167, name: "Sinh tố xoài dứa", price: 36000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
            { id: 168, name: "Sinh tố dâu tây", price: 33000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 169, name: "Nước ép cam tươi", price: 26000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 170, name: "Nước ép táo xanh", price: 23000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
        ]
    },
    {
        id: 18,
        name: "Bubble Tea FTU",
        description: "Trà sữa trân châu đa dạng",
        rating: 4.3,
        deliveryTime: "12-18 phút",
        location: "Gần ĐH Ngoại Thương",
        universityId: 3,
        menu: [
            // Coffee (2 món)
            { id: 171, name: "Cà phê sữa đá", price: 19000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
            { id: 172, name: "Cà phê nâu", price: 23000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 173, name: "Trà sữa trân châu", price: 26000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 174, name: "Trà sữa trân châu đường đen", price: 29000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 175, name: "Trà sữa socola", price: 26000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 176, name: "Trà sữa dâu tây", price: 31000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 177, name: "Sinh tố bơ", price: 31000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 178, name: "Sinh tố chuối", price: 26000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 179, name: "Nước ép dưa hấu", price: 19000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 180, name: "Nước ép cà rốt", price: 21000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    // ĐH Quốc gia TP.HCM - 6 cửa hàng
    {
        id: 19,
        name: "Café VNU-HCM",
        description: "Cà phê cho sinh viên VNU-HCM",
        rating: 4.5,
        deliveryTime: "15-20 phút",
        location: "Gần VNU-HCM",
        universityId: 4,
        menu: [
            // Coffee (3 món)
            { id: 181, name: "Cà phê đen", price: 18000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
            { id: 182, name: "Cà phê sữa", price: 22000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
            { id: 183, name: "Cappuccino", price: 37000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            // Tea (3 món)
            { id: 184, name: "Trà sữa trân châu", price: 27000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 185, name: "Trà sữa matcha", price: 32000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 186, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 187, name: "Sinh tố bơ", price: 32000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 188, name: "Sinh tố dâu", price: 37000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 189, name: "Nước ép cam", price: 20000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
            { id: 190, name: "Nước ép táo", price: 22000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
        ]
    },
    {
        id: 20,
        name: "Tea House VNU",
        description: "Trà và đồ uống nhẹ",
        rating: 4.7,
        deliveryTime: "10-15 phút",
        location: "Gần VNU-HCM",
        universityId: 4,
        menu: [
            // Coffee (2 món)
            { id: 191, name: "Espresso", price: 27000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 192, name: "Americano", price: 32000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 193, name: "Trà đen", price: 17000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
            { id: 194, name: "Trà xanh", price: 20000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
            { id: 195, name: "Trà sữa socola", price: 27000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 196, name: "Trà hoa cúc", price: 22000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
            // Smoothie (2 món)
            { id: 197, name: "Sinh tố xoài", price: 34000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
            { id: 198, name: "Sinh tố chuối", price: 27000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 199, name: "Nước ép dưa hấu", price: 20000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 200, name: "Nước ép cà rốt", price: 22000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    {
        id: 21,
        name: "Smoothie Paradise VNU",
        description: "Sinh tố đa dạng",
        rating: 4.6,
        deliveryTime: "15-20 phút",
        location: "Gần VNU-HCM",
        universityId: 4,
        menu: [
            // Coffee (2 món)
            { id: 201, name: "Latte", price: 42000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
            { id: 202, name: "Mocha", price: 47000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 203, name: "Trà sữa trân châu đường đen", price: 30000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 204, name: "Trà sữa dâu tây", price: 32000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            // Smoothie (4 món)
            { id: 205, name: "Sinh tố dưa hấu", price: 30000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
            { id: 206, name: "Sinh tố dứa", price: 32000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
            { id: 207, name: "Sinh tố kiwi", price: 42000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
            { id: 208, name: "Sinh tố dừa", price: 37000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
            // Juice (2 món)
            { id: 209, name: "Nước ép cam tươi", price: 27000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 210, name: "Nước ép táo xanh", price: 24000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
        ]
    },
    {
        id: 22,
        name: "Fresh Juice Bar VNU",
        description: "Nước ép tươi ngon",
        rating: 4.4,
        deliveryTime: "8-12 phút",
        location: "Gần VNU-HCM",
        universityId: 4,
        menu: [
            // Coffee (2 món)
            { id: 211, name: "Cà phê đá xay", price: 37000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
            { id: 212, name: "Frappuccino", price: 44000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 213, name: "Trà sữa trân châu socola", price: 37000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
            { id: 214, name: "Trà sữa trân châu dâu", price: 34000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 215, name: "Sinh tố bơ dừa", price: 40000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
            { id: 216, name: "Sinh tố chuối dâu", price: 32000, description: "Sinh tố chuối dâu thơm ngon", category: "smoothie", image: "🍌" },
            // Juice (4 món)
            { id: 217, name: "Nước ép dưa hấu", price: 20000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 218, name: "Nước ép cà chua", price: 22000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" },
            { id: 219, name: "Nước ép cà rốt", price: 22000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" },
            { id: 220, name: "Nước ép dưa hấu", price: 20000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
        ]
    },
    {
        id: 23,
        name: "Coffee Lab VNU",
        description: "Cà phê specialty",
        rating: 4.8,
        deliveryTime: "18-25 phút",
        location: "Gần VNU-HCM",
        universityId: 4,
        menu: [
            // Coffee (4 món)
            { id: 221, name: "Espresso", price: 27000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 222, name: "Americano", price: 30000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            { id: 223, name: "Cappuccino", price: 37000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            { id: 224, name: "Macchiato", price: 42000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 225, name: "Trà sữa matcha", price: 32000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 226, name: "Trà sữa thái", price: 26000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 227, name: "Sinh tố xoài dứa", price: 37000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
            { id: 228, name: "Sinh tố dâu tây", price: 34000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 229, name: "Nước ép cam tươi", price: 27000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 230, name: "Nước ép táo xanh", price: 24000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
        ]
    },
    {
        id: 24,
        name: "Bubble Tea VNU",
        description: "Trà sữa trân châu đa dạng",
        rating: 4.4,
        deliveryTime: "12-18 phút",
        location: "Gần VNU-HCM",
        universityId: 4,
        menu: [
            // Coffee (2 món)
            { id: 231, name: "Cà phê sữa đá", price: 20000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
            { id: 232, name: "Cà phê nâu", price: 24000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 233, name: "Trà sữa trân châu", price: 27000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 234, name: "Trà sữa trân châu đường đen", price: 30000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 235, name: "Trà sữa socola", price: 27000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 236, name: "Trà sữa dâu tây", price: 32000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 237, name: "Sinh tố bơ", price: 32000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 238, name: "Sinh tố chuối", price: 27000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 239, name: "Nước ép dưa hấu", price: 20000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 240, name: "Nước ép cà rốt", price: 22000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    // ĐH Sư phạm Hà Nội - 6 cửa hàng
    {
        id: 25,
        name: "Café Sư Phạm",
        description: "Cà phê cho sinh viên sư phạm",
        rating: 4.4,
        deliveryTime: "12-18 phút",
        location: "Gần ĐH Sư Phạm",
        universityId: 5,
        menu: [
            // Coffee (3 món)
            { id: 241, name: "Cà phê đen", price: 15000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
            { id: 242, name: "Cà phê sữa", price: 19000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
            { id: 243, name: "Cappuccino", price: 34000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            // Tea (3 món)
            { id: 244, name: "Trà sữa trân châu", price: 24000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 245, name: "Trà sữa matcha", price: 29000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 246, name: "Trà sữa thái", price: 21000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 247, name: "Sinh tố bơ", price: 29000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 248, name: "Sinh tố dâu", price: 34000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 249, name: "Nước ép cam", price: 17000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
            { id: 250, name: "Nước ép táo", price: 19000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
        ]
    },
    {
        id: 26,
        name: "Tea Time SP",
        description: "Trà và đồ uống nhẹ",
        rating: 4.6,
        deliveryTime: "10-15 phút",
        location: "Gần ĐH Sư Phạm",
        universityId: 5,
        menu: [
            // Coffee (2 món)
            { id: 251, name: "Espresso", price: 24000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 252, name: "Americano", price: 29000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 253, name: "Trà đen", price: 14000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
            { id: 254, name: "Trà xanh", price: 17000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
            { id: 255, name: "Trà sữa socola", price: 24000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 256, name: "Trà hoa cúc", price: 19000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
            // Smoothie (2 món)
            { id: 257, name: "Sinh tố xoài", price: 31000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
            { id: 258, name: "Sinh tố chuối", price: 24000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 259, name: "Nước ép dưa hấu", price: 17000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 260, name: "Nước ép cà rốt", price: 19000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    {
        id: 27,
        name: "Smoothie Paradise SP",
        description: "Sinh tố đa dạng",
        rating: 4.5,
        deliveryTime: "15-20 phút",
        location: "Gần ĐH Sư Phạm",
        universityId: 5,
        menu: [
            // Coffee (2 món)
            { id: 261, name: "Latte", price: 39000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
            { id: 262, name: "Mocha", price: 44000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 263, name: "Trà sữa trân châu đường đen", price: 27000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 264, name: "Trà sữa dâu tây", price: 29000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            // Smoothie (4 món)
            { id: 265, name: "Sinh tố dưa hấu", price: 27000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
            { id: 266, name: "Sinh tố dứa", price: 29000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
            { id: 267, name: "Sinh tố kiwi", price: 39000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
            { id: 268, name: "Sinh tố dừa", price: 34000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
            // Juice (2 món)
            { id: 269, name: "Nước ép cam tươi", price: 24000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 270, name: "Nước ép táo xanh", price: 21000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
        ]
    },
    {
        id: 28,
        name: "Fresh Juice Bar SP",
        description: "Nước ép tươi cho sinh viên",
        rating: 4.3,
        deliveryTime: "8-12 phút",
        location: "Gần ĐH Sư Phạm",
        universityId: 5,
        menu: [
            // Coffee (2 món)
            { id: 271, name: "Cà phê đá xay", price: 34000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
            { id: 272, name: "Frappuccino", price: 41000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 273, name: "Trà sữa trân châu socola", price: 34000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
            { id: 274, name: "Trà sữa trân châu dâu", price: 31000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 275, name: "Sinh tố bơ dừa", price: 37000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
            { id: 276, name: "Sinh tố chuối dâu", price: 29000, description: "Sinh tố chuối dâu thơm ngon", category: "smoothie", image: "🍌" },
            // Juice (4 món)
            { id: 277, name: "Nước ép dưa hấu", price: 17000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 278, name: "Nước ép cà chua", price: 19000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" },
            { id: 279, name: "Nước ép cà rốt", price: 19000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" },
            { id: 280, name: "Nước ép dưa hấu", price: 17000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
        ]
    },
    {
        id: 29,
        name: "Coffee Corner SP",
        description: "Cà phê specialty",
        rating: 4.7,
        deliveryTime: "18-25 phút",
        location: "Gần ĐH Sư Phạm",
        universityId: 5,
        menu: [
            // Coffee (4 món)
            { id: 281, name: "Espresso", price: 24000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 282, name: "Americano", price: 27000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            { id: 283, name: "Cappuccino", price: 34000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            { id: 284, name: "Macchiato", price: 39000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 285, name: "Trà sữa matcha", price: 29000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 286, name: "Trà sữa thái", price: 23000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 287, name: "Sinh tố xoài dứa", price: 34000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
            { id: 288, name: "Sinh tố dâu tây", price: 31000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 289, name: "Nước ép cam tươi", price: 24000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 290, name: "Nước ép táo xanh", price: 21000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
        ]
    },
    {
        id: 30,
        name: "Bubble Tea SP",
        description: "Trà sữa trân châu đa dạng",
        rating: 4.2,
        deliveryTime: "12-18 phút",
        location: "Gần ĐH Sư Phạm",
        universityId: 5,
        menu: [
            // Coffee (2 món)
            { id: 291, name: "Cà phê sữa đá", price: 17000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
            { id: 292, name: "Cà phê nâu", price: 21000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 293, name: "Trà sữa trân châu", price: 24000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 294, name: "Trà sữa trân châu đường đen", price: 27000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 295, name: "Trà sữa socola", price: 24000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 296, name: "Trà sữa dâu tây", price: 29000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 297, name: "Sinh tố bơ", price: 29000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 298, name: "Sinh tố chuối", price: 24000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 299, name: "Nước ép dưa hấu", price: 17000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 300, name: "Nước ép cà rốt", price: 19000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    // ĐH Y Hà Nội - 6 cửa hàng
    {
        id: 31,
        name: "Café Y Khoa",
        description: "Cà phê cho sinh viên y khoa",
        rating: 4.8,
        deliveryTime: "15-20 phút",
        location: "Gần ĐH Y Hà Nội",
        universityId: 6,
        menu: [
            // Coffee (3 món)
            { id: 301, name: "Cà phê đen", price: 16000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
            { id: 302, name: "Cà phê sữa", price: 20000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
            { id: 303, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            // Tea (3 món)
            { id: 304, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 305, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 306, name: "Trà sữa thái", price: 22000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 307, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 308, name: "Sinh tố dâu", price: 35000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 309, name: "Nước ép cam", price: 18000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
            { id: 310, name: "Nước ép táo", price: 20000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
        ]
    },
    {
        id: 32,
        name: "Healthy Drinks",
        description: "Đồ uống tốt cho sức khỏe",
        rating: 4.6,
        deliveryTime: "10-15 phút",
        location: "Gần ĐH Y Hà Nội",
        universityId: 6,
        menu: [
            // Coffee (2 món)
            { id: 311, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 312, name: "Americano", price: 30000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 313, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
            { id: 314, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
            { id: 315, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 316, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
            // Smoothie (2 món)
            { id: 317, name: "Sinh tố xoài", price: 32000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
            { id: 318, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 319, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 320, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    {
        id: 33,
        name: "Tea House Y",
        description: "Trà thảo dược và trà truyền thống",
        rating: 4.5,
        deliveryTime: "12-18 phút",
        location: "Gần ĐH Y Hà Nội",
        universityId: 6,
        menu: [
            // Coffee (2 món)
            { id: 321, name: "Latte", price: 40000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
            { id: 322, name: "Mocha", price: 45000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 323, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 324, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            { id: 325, name: "Trà gừng", price: 22000, description: "Trà gừng ấm bụng", category: "tea", image: "🍵" },
            { id: 326, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
            // Smoothie (2 món)
            { id: 327, name: "Sinh tố dưa hấu", price: 28000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
            { id: 328, name: "Sinh tố dứa", price: 30000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
            // Juice (2 món)
            { id: 329, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 330, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
        ]
    },
    {
        id: 34,
        name: "Smoothie Health",
        description: "Sinh tố bổ dưỡng",
        rating: 4.4,
        deliveryTime: "15-20 phút",
        location: "Gần ĐH Y Hà Nội",
        universityId: 6,
        menu: [
            // Coffee (2 món)
            { id: 331, name: "Cà phê đá xay", price: 35000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
            { id: 332, name: "Frappuccino", price: 42000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 333, name: "Trà sữa trân châu socola", price: 35000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
            { id: 334, name: "Trà sữa trân châu dâu", price: 32000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
            // Smoothie (4 món)
            { id: 335, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 336, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
            { id: 337, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            { id: 338, name: "Sinh tố rau xanh", price: 28000, description: "Sinh tố rau xanh bổ dưỡng", category: "smoothie", image: "🥬" },
            // Juice (2 món)
            { id: 339, name: "Nước ép cà chua", price: 22000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" },
            { id: 340, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    {
        id: 35,
        name: "Coffee Lab Y",
        description: "Cà phê specialty cho sinh viên y",
        rating: 4.7,
        deliveryTime: "18-25 phút",
        location: "Gần ĐH Y Hà Nội",
        universityId: 6,
        menu: [
            // Coffee (4 món)
            { id: 341, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 342, name: "Americano", price: 28000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            { id: 343, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            { id: 344, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
            // Tea (2 món)
            { id: 345, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 346, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 347, name: "Sinh tố xoài dứa", price: 35000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
            { id: 348, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
            // Juice (2 món)
            { id: 349, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 350, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
        ]
    },
    {
        id: 36,
        name: "Bubble Tea Y",
        description: "Trà sữa trân châu cho sinh viên y",
        rating: 4.3,
        deliveryTime: "12-18 phút",
        location: "Gần ĐH Y Hà Nội",
        universityId: 6,
        menu: [
            // Coffee (2 món)
            { id: 351, name: "Cà phê sữa đá", price: 18000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
            { id: 352, name: "Cà phê nâu", price: 22000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
            // Tea (4 món)
            { id: 353, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 354, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 355, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 356, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            // Smoothie (2 món)
            { id: 357, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 358, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            // Juice (2 món)
            { id: 359, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 360, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    // ĐH Công nghệ - 6 cửa hàng
    {
        id: 37,
        name: "Tech Café",
        description: "Cà phê cho sinh viên công nghệ",
        rating: 4.6,
        deliveryTime: "10-15 phút",
        location: "Gần ĐH Công nghệ",
        universityId: 7,
        menu: [
            { id: 361, name: "Cà phê đen", price: 16000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
            { id: 362, name: "Cà phê sữa", price: 20000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
            { id: 363, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
            { id: 364, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 365, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 366, name: "Trà sữa thái", price: 22000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            { id: 367, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 368, name: "Sinh tố dâu", price: 35000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
            { id: 369, name: "Nước ép cam", price: 18000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
            { id: 370, name: "Nước ép táo", price: 20000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
        ]
    },
    {
        id: 38,
        name: "Code Coffee",
        description: "Cà phê cho lập trình viên",
        rating: 4.7,
        deliveryTime: "12-18 phút",
        location: "Gần ĐH Công nghệ",
        universityId: 7,
        menu: [
            { id: 371, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
            { id: 372, name: "Americano", price: 30000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
            { id: 373, name: "Latte", price: 40000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
            { id: 374, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
            { id: 375, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
            { id: 376, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
            { id: 377, name: "Sinh tố xoài", price: 32000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
            { id: 378, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
            { id: 379, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 380, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
        ]
    },
    {
        id: 39,
        name: "Digital Tea",
        description: "Trà và đồ uống cho sinh viên IT",
        rating: 4.4,
        deliveryTime: "8-12 phút",
        location: "Gần ĐH Công nghệ",
        universityId: 7,
        menu: [
            { id: 381, name: "Mocha", price: 45000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
            { id: 382, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
            { id: 383, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
            { id: 384, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
            { id: 385, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
            { id: 386, name: "Sinh tố dưa hấu", price: 28000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
            { id: 387, name: "Sinh tố dứa", price: 30000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
            { id: 388, name: "Sinh tố kiwi", price: 40000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
            { id: 389, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 390, name: "Nước ép cà chua", price: 20000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" }
        ]
    },
    {
        id: 40,
        name: "Algorithm Smoothie",
        description: "Sinh tố và nước ép tươi",
        rating: 4.5,
        deliveryTime: "10-15 phút",
        location: "Gần ĐH Công nghệ",
        universityId: 7,
        menu: [
            { id: 391, name: "Cà phê đá xay", price: 35000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
            { id: 392, name: "Frappuccino", price: 42000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
            { id: 393, name: "Trà sữa trân châu socola", price: 35000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
            { id: 394, name: "Trà sữa trân châu dâu", price: 32000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
            { id: 395, name: "Sinh tố dừa", price: 35000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
            { id: 396, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
            { id: 397, name: "Sinh tố bơ dừa", price: 38000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
            { id: 398, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" },
            { id: 399, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 400, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
        ]
    },
    {
        id: 41,
        name: "Fresh Code Juice",
        description: "Nước ép tươi cho lập trình viên",
        rating: 4.3,
        deliveryTime: "8-12 phút",
        location: "Gần ĐH Công nghệ",
        universityId: 7,
        menu: [
            { id: 401, name: "Cà phê sữa đá", price: 18000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
            { id: 402, name: "Cà phê nâu", price: 22000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
            { id: 403, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
            { id: 404, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
            { id: 405, name: "Sinh tố xoài dứa", price: 35000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
            { id: 406, name: "Sinh tố chuối dâu", price: 30000, description: "Sinh tố chuối dâu thơm ngon", category: "smoothie", image: "🍌" },
            { id: 407, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
            { id: 408, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" },
            { id: 409, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
            { id: 410, name: "Nước ép cà chua", price: 20000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" }
        ]
    },
    {
        id: 42,
        name: "Tech Garden",
        description: "Trà truyền thống và hiện đại",
        rating: 4.6,
        deliveryTime: "12-18 phút",
        location: "Gần ĐH Công nghệ",
        universityId: 7,
        menu: [
            { id: 411, name: "Cà phê phin", price: 20000, description: "Cà phê phin truyền thống", category: "coffee", image: "☕" },
            { id: 412, name: "Cà phê sữa nóng", price: 22000, description: "Cà phê sữa nóng ấm áp", category: "coffee", image: "☕" },
            { id: 413, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
            { id: 414, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
            { id: 415, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
            { id: 416, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
            { id: 417, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
            { id: 418, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
            { id: 419, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" },
            { id: 420, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" }
        ]
    },
    // ĐH Thương mại - 6 cửa hàng (tóm tắt)
    { id: 43, name: "Business Café", description: "Cà phê cho sinh viên thương mại", rating: 4.5, deliveryTime: "15-20 phút", location: "Gần ĐH Thương mại", universityId: 8, menu: [
        { id: 421, name: "Cà phê đen", price: 16000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
        { id: 422, name: "Cà phê sữa", price: 20000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
        { id: 423, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
        { id: 424, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
        { id: 425, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
        { id: 426, name: "Trà sữa thái", price: 22000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
        { id: 427, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
        { id: 428, name: "Sinh tố dâu", price: 35000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
        { id: 429, name: "Nước ép cam", price: 18000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
        { id: 430, name: "Nước ép táo", price: 20000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
    ]},
    { id: 44, name: "Trade House", description: "Trà và đồ uống cho sinh viên kinh doanh", rating: 4.4, deliveryTime: "10-15 phút", location: "Gần ĐH Thương mại", universityId: 8, menu: [
        { id: 431, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
        { id: 432, name: "Americano", price: 30000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
        { id: 433, name: "Latte", price: 40000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
        { id: 434, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
        { id: 435, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
        { id: 436, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
        { id: 437, name: "Sinh tố xoài", price: 32000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
        { id: 438, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
        { id: 439, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 440, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
    ]},
    { id: 45, name: "Commerce Smoothie", description: "Sinh tố đa dạng", rating: 4.3, deliveryTime: "12-18 phút", location: "Gần ĐH Thương mại", universityId: 8, menu: [
        { id: 441, name: "Mocha", price: 45000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
        { id: 442, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
        { id: 443, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
        { id: 444, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
        { id: 445, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
        { id: 446, name: "Sinh tố dưa hấu", price: 28000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
        { id: 447, name: "Sinh tố dứa", price: 30000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
        { id: 448, name: "Sinh tố kiwi", price: 40000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
        { id: 449, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 450, name: "Nước ép cà chua", price: 20000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" }
    ]},
    { id: 46, name: "Business Juice", description: "Nước ép tươi", rating: 4.2, deliveryTime: "8-12 phút", location: "Gần ĐH Thương mại", universityId: 8, menu: [
        { id: 451, name: "Cà phê đá xay", price: 35000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
        { id: 452, name: "Frappuccino", price: 42000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
        { id: 453, name: "Trà sữa trân châu socola", price: 35000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
        { id: 454, name: "Trà sữa trân châu dâu", price: 32000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
        { id: 455, name: "Sinh tố dừa", price: 35000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
        { id: 456, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
        { id: 457, name: "Sinh tố bơ dừa", price: 38000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
        { id: 458, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" },
        { id: 459, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
        { id: 460, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
    ]},
    { id: 47, name: "Trade Lab", description: "Cà phê specialty", rating: 4.6, deliveryTime: "18-25 phút", location: "Gần ĐH Thương mại", universityId: 8, menu: [
        { id: 461, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
        { id: 462, name: "Americano", price: 28000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
        { id: 463, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
        { id: 464, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
        { id: 465, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
        { id: 466, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
        { id: 467, name: "Sinh tố xoài dứa", price: 35000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
        { id: 468, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
        { id: 469, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
        { id: 470, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
    ]},
    { id: 48, name: "Business Bubble", description: "Trà sữa trân châu đa dạng", rating: 4.1, deliveryTime: "12-18 phút", location: "Gần ĐH Thương mại", universityId: 8, menu: [
        { id: 471, name: "Cà phê sữa đá", price: 18000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
        { id: 472, name: "Cà phê nâu", price: 22000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
        { id: 473, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
        { id: 474, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
        { id: 475, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
        { id: 476, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
        { id: 477, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
        { id: 478, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
        { id: 479, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 480, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
    ]},
    // ĐH Luật Hà Nội - 6 cửa hàng
    { id: 49, name: "Justice Café", description: "Cà phê cho sinh viên luật", rating: 4.7, deliveryTime: "15-20 phút", location: "Gần ĐH Luật Hà Nội", universityId: 9, menu: [
        { id: 481, name: "Cà phê đen", price: 16000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
        { id: 482, name: "Cà phê sữa", price: 20000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
        { id: 483, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
        { id: 484, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
        { id: 485, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
        { id: 486, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
        { id: 487, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
        { id: 488, name: "Sinh tố dâu", price: 35000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
        { id: 489, name: "Nước ép cam", price: 18000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
        { id: 490, name: "Nước ép táo", price: 20000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
    ]},
    { id: 50, name: "Legal Tea House", description: "Trà và đồ uống cho sinh viên luật", rating: 4.5, deliveryTime: "10-15 phút", location: "Gần ĐH Luật Hà Nội", universityId: 9, menu: [
        { id: 491, name: "Americano", price: 30000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
        { id: 492, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
        { id: 493, name: "Latte", price: 40000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
        { id: 494, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
        { id: 495, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
        { id: 496, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
        { id: 497, name: "Sinh tố xoài", price: 32000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
        { id: 498, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
        { id: 499, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 500, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
    ]},
    { id: 51, name: "Court Smoothie", description: "Sinh tố đa dạng cho sinh viên luật", rating: 4.3, deliveryTime: "12-18 phút", location: "Gần ĐH Luật Hà Nội", universityId: 9, menu: [
        { id: 501, name: "Mocha", price: 45000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
        { id: 502, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
        { id: 503, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
        { id: 504, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
        { id: 505, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
        { id: 506, name: "Sinh tố dưa hấu", price: 28000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
        { id: 507, name: "Sinh tố dứa", price: 30000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
        { id: 508, name: "Sinh tố kiwi", price: 40000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
        { id: 509, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 510, name: "Nước ép cà chua", price: 20000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" }
    ]},
    { id: 52, name: "Law Library Juice", description: "Nước ép tươi cho sinh viên luật", rating: 4.4, deliveryTime: "8-12 phút", location: "Gần ĐH Luật Hà Nội", universityId: 9, menu: [
        { id: 511, name: "Cà phê đá xay", price: 35000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
        { id: 512, name: "Frappuccino", price: 42000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
        { id: 513, name: "Trà sữa trân châu socola", price: 35000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
        { id: 514, name: "Trà sữa trân châu dâu", price: 32000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
        { id: 515, name: "Sinh tố dừa", price: 35000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
        { id: 516, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
        { id: 517, name: "Sinh tố bơ dừa", price: 38000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
        { id: 518, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" },
        { id: 519, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
        { id: 520, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
    ]},
    { id: 53, name: "Legal Lab", description: "Cà phê specialty cho sinh viên luật", rating: 4.6, deliveryTime: "18-25 phút", location: "Gần ĐH Luật Hà Nội", universityId: 9, menu: [
        { id: 521, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
        { id: 522, name: "Americano", price: 28000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
        { id: 523, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
        { id: 524, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
        { id: 525, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
        { id: 526, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
        { id: 527, name: "Sinh tố xoài dứa", price: 35000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
        { id: 528, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
        { id: 529, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
        { id: 530, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
    ]},
    { id: 54, name: "Justice Bubble", description: "Trà sữa trân châu cho sinh viên luật", rating: 4.2, deliveryTime: "12-18 phút", location: "Gần ĐH Luật Hà Nội", universityId: 9, menu: [
        { id: 531, name: "Cà phê sữa đá", price: 18000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
        { id: 532, name: "Cà phê nâu", price: 22000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
        { id: 533, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
        { id: 534, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
        { id: 535, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
        { id: 536, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
        { id: 537, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
        { id: 538, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
        { id: 539, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 540, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
    ]},
    // ĐH Kiến trúc Hà Nội - 6 cửa hàng
    { id: 55, name: "Architect Café", description: "Cà phê cho sinh viên kiến trúc", rating: 4.6, deliveryTime: "15-20 phút", location: "Gần ĐH Kiến trúc Hà Nội", universityId: 10, menu: [
        { id: 541, name: "Cà phê đen", price: 16000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
        { id: 542, name: "Cà phê sữa", price: 20000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
        { id: 543, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
        { id: 544, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
        { id: 545, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
        { id: 546, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
        { id: 547, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
        { id: 548, name: "Sinh tố dâu", price: 35000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
        { id: 549, name: "Nước ép cam", price: 18000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
        { id: 550, name: "Nước ép táo", price: 20000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
    ]},
    { id: 56, name: "Design Tea House", description: "Trà và đồ uống cho sinh viên kiến trúc", rating: 4.4, deliveryTime: "10-15 phút", location: "Gần ĐH Kiến trúc Hà Nội", universityId: 10, menu: [
        { id: 551, name: "Americano", price: 30000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
        { id: 552, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
        { id: 553, name: "Latte", price: 40000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
        { id: 554, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
        { id: 555, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
        { id: 556, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
        { id: 557, name: "Sinh tố xoài", price: 32000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
        { id: 558, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
        { id: 559, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 560, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
    ]},
    { id: 57, name: "Blueprint Smoothie", description: "Sinh tố đa dạng cho sinh viên kiến trúc", rating: 4.3, deliveryTime: "12-18 phút", location: "Gần ĐH Kiến trúc Hà Nội", universityId: 10, menu: [
        { id: 561, name: "Mocha", price: 45000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
        { id: 562, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
        { id: 563, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
        { id: 564, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
        { id: 565, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
        { id: 566, name: "Sinh tố dưa hấu", price: 28000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
        { id: 567, name: "Sinh tố dứa", price: 30000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
        { id: 568, name: "Sinh tố kiwi", price: 40000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
        { id: 569, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 570, name: "Nước ép cà chua", price: 20000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" }
    ]},
    { id: 58, name: "Studio Juice", description: "Nước ép tươi cho sinh viên kiến trúc", rating: 4.5, deliveryTime: "8-12 phút", location: "Gần ĐH Kiến trúc Hà Nội", universityId: 10, menu: [
        { id: 571, name: "Cà phê đá xay", price: 35000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
        { id: 572, name: "Frappuccino", price: 42000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
        { id: 573, name: "Trà sữa trân châu socola", price: 35000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
        { id: 574, name: "Trà sữa trân châu dâu", price: 32000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
        { id: 575, name: "Sinh tố dừa", price: 35000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
        { id: 576, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
        { id: 577, name: "Sinh tố bơ dừa", price: 38000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
        { id: 578, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" },
        { id: 579, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
        { id: 580, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
    ]},
    { id: 59, name: "Creative Lab", description: "Cà phê specialty cho sinh viên kiến trúc", rating: 4.7, deliveryTime: "18-25 phút", location: "Gần ĐH Kiến trúc Hà Nội", universityId: 10, menu: [
        { id: 581, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
        { id: 582, name: "Americano", price: 28000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
        { id: 583, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
        { id: 584, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
        { id: 585, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
        { id: 586, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
        { id: 587, name: "Sinh tố xoài dứa", price: 35000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
        { id: 588, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
        { id: 589, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
        { id: 590, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
    ]},
    { id: 60, name: "Architect Bubble", description: "Trà sữa trân châu cho sinh viên kiến trúc", rating: 4.1, deliveryTime: "12-18 phút", location: "Gần ĐH Kiến trúc Hà Nội", universityId: 10, menu: [
        { id: 591, name: "Cà phê sữa đá", price: 18000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
        { id: 592, name: "Cà phê nâu", price: 22000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
        { id: 593, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
        { id: 594, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
        { id: 595, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
        { id: 596, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
        { id: 597, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
        { id: 598, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
        { id: 599, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 600, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
    ]},
    // ĐH Mỹ thuật Việt Nam - 6 cửa hàng
    { id: 61, name: "Art Café", description: "Cà phê cho sinh viên mỹ thuật", rating: 4.8, deliveryTime: "15-20 phút", location: "Gần ĐH Mỹ thuật Việt Nam", universityId: 11, menu: [
        { id: 601, name: "Cà phê đen", price: 16000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
        { id: 602, name: "Cà phê sữa", price: 20000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
        { id: 603, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
        { id: 604, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
        { id: 605, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
        { id: 606, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
        { id: 607, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
        { id: 608, name: "Sinh tố dâu", price: 35000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
        { id: 609, name: "Nước ép cam", price: 18000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
        { id: 610, name: "Nước ép táo", price: 20000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
    ]},
    { id: 62, name: "Gallery Tea", description: "Trà và đồ uống cho sinh viên mỹ thuật", rating: 4.6, deliveryTime: "10-15 phút", location: "Gần ĐH Mỹ thuật Việt Nam", universityId: 11, menu: [
        { id: 611, name: "Americano", price: 30000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
        { id: 612, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
        { id: 613, name: "Latte", price: 40000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
        { id: 614, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
        { id: 615, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
        { id: 616, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
        { id: 617, name: "Sinh tố xoài", price: 32000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
        { id: 618, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
        { id: 619, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 620, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
    ]},
    { id: 63, name: "Canvas Smoothie", description: "Sinh tố đa dạng cho sinh viên mỹ thuật", rating: 4.4, deliveryTime: "12-18 phút", location: "Gần ĐH Mỹ thuật Việt Nam", universityId: 11, menu: [
        { id: 621, name: "Mocha", price: 45000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
        { id: 622, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
        { id: 623, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
        { id: 624, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
        { id: 625, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
        { id: 626, name: "Sinh tố dưa hấu", price: 28000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
        { id: 627, name: "Sinh tố dứa", price: 30000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
        { id: 628, name: "Sinh tố kiwi", price: 40000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
        { id: 629, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 630, name: "Nước ép cà chua", price: 20000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" }
    ]},
    { id: 64, name: "Palette Juice", description: "Nước ép tươi cho sinh viên mỹ thuật", rating: 4.5, deliveryTime: "8-12 phút", location: "Gần ĐH Mỹ thuật Việt Nam", universityId: 11, menu: [
        { id: 631, name: "Cà phê đá xay", price: 35000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
        { id: 632, name: "Frappuccino", price: 42000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
        { id: 633, name: "Trà sữa trân châu socola", price: 35000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
        { id: 634, name: "Trà sữa trân châu dâu", price: 32000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
        { id: 635, name: "Sinh tố dừa", price: 35000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
        { id: 636, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
        { id: 637, name: "Sinh tố bơ dừa", price: 38000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
        { id: 638, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" },
        { id: 639, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
        { id: 640, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
    ]},
    { id: 65, name: "Studio Lab", description: "Cà phê specialty cho sinh viên mỹ thuật", rating: 4.7, deliveryTime: "18-25 phút", location: "Gần ĐH Mỹ thuật Việt Nam", universityId: 11, menu: [
        { id: 641, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
        { id: 642, name: "Americano", price: 28000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
        { id: 643, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
        { id: 644, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
        { id: 645, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
        { id: 646, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
        { id: 647, name: "Sinh tố xoài dứa", price: 35000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
        { id: 648, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
        { id: 649, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
        { id: 650, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
    ]},
    { id: 66, name: "Art Bubble", description: "Trà sữa trân châu cho sinh viên mỹ thuật", rating: 4.3, deliveryTime: "12-18 phút", location: "Gần ĐH Mỹ thuật Việt Nam", universityId: 11, menu: [
        { id: 651, name: "Cà phê sữa đá", price: 18000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
        { id: 652, name: "Cà phê nâu", price: 22000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
        { id: 653, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
        { id: 654, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
        { id: 655, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
        { id: 656, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
        { id: 657, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
        { id: 658, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
        { id: 659, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 660, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
    ]},
    // ĐH Thể thao và Du lịch - 6 cửa hàng
    { id: 67, name: "Sports Café", description: "Cà phê cho sinh viên thể thao", rating: 4.5, deliveryTime: "15-20 phút", location: "Gần ĐH Thể thao và Du lịch", universityId: 12, menu: [
        { id: 661, name: "Cà phê đen", price: 16000, description: "Cà phê đen truyền thống", category: "coffee", image: "☕" },
        { id: 662, name: "Cà phê sữa", price: 20000, description: "Cà phê sữa đá ngon", category: "coffee", image: "🥛" },
        { id: 663, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
        { id: 664, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
        { id: 665, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
        { id: 666, name: "Trà đen", price: 15000, description: "Trà đen truyền thống", category: "tea", image: "🍵" },
        { id: 667, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
        { id: 668, name: "Sinh tố dâu", price: 35000, description: "Sinh tố dâu tươi", category: "smoothie", image: "🍓" },
        { id: 669, name: "Nước ép cam", price: 18000, description: "Nước ép cam tươi", category: "juice", image: "🍊" },
        { id: 670, name: "Nước ép táo", price: 20000, description: "Nước ép táo tươi", category: "juice", image: "🍎" }
    ]},
    { id: 68, name: "Fitness Tea", description: "Trà và đồ uống cho sinh viên thể thao", rating: 4.4, deliveryTime: "10-15 phút", location: "Gần ĐH Thể thao và Du lịch", universityId: 12, menu: [
        { id: 671, name: "Americano", price: 30000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
        { id: 672, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
        { id: 673, name: "Latte", price: 40000, description: "Latte thơm ngon", category: "coffee", image: "☕" },
        { id: 674, name: "Trà xanh", price: 18000, description: "Trà xanh thơm ngon", category: "tea", image: "🍵" },
        { id: 675, name: "Trà hoa cúc", price: 20000, description: "Trà hoa cúc thanh mát", category: "tea", image: "🌼" },
        { id: 676, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
        { id: 677, name: "Sinh tố xoài", price: 32000, description: "Sinh tố xoài chín", category: "smoothie", image: "🥭" },
        { id: 678, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
        { id: 679, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 680, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
    ]},
    { id: 69, name: "Energy Smoothie", description: "Sinh tố đa dạng cho sinh viên thể thao", rating: 4.6, deliveryTime: "12-18 phút", location: "Gần ĐH Thể thao và Du lịch", universityId: 12, menu: [
        { id: 681, name: "Mocha", price: 45000, description: "Mocha socola đậm đà", category: "coffee", image: "☕" },
        { id: 682, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
        { id: 683, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
        { id: 684, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
        { id: 685, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
        { id: 686, name: "Sinh tố dưa hấu", price: 28000, description: "Sinh tố dưa hấu mát lạnh", category: "smoothie", image: "🍉" },
        { id: 687, name: "Sinh tố dứa", price: 30000, description: "Sinh tố dứa nhiệt đới", category: "smoothie", image: "🍍" },
        { id: 688, name: "Sinh tố kiwi", price: 40000, description: "Sinh tố kiwi bổ dưỡng", category: "smoothie", image: "🥝" },
        { id: 689, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 690, name: "Nước ép cà chua", price: 20000, description: "Nước ép cà chua bổ dưỡng", category: "juice", image: "🍅" }
    ]},
    { id: 70, name: "Tourism Juice", description: "Nước ép tươi cho sinh viên du lịch", rating: 4.3, deliveryTime: "8-12 phút", location: "Gần ĐH Thể thao và Du lịch", universityId: 12, menu: [
        { id: 691, name: "Cà phê đá xay", price: 35000, description: "Cà phê đá xay mát lạnh", category: "coffee", image: "☕" },
        { id: 692, name: "Frappuccino", price: 42000, description: "Frappuccino thơm ngon", category: "coffee", image: "☕" },
        { id: 693, name: "Trà sữa trân châu socola", price: 35000, description: "Trà sữa socola với trân châu", category: "tea", image: "🧋" },
        { id: 694, name: "Trà sữa trân châu dâu", price: 32000, description: "Trà sữa dâu với trân châu", category: "tea", image: "🧋" },
        { id: 695, name: "Sinh tố dừa", price: 35000, description: "Sinh tố dừa tươi", category: "smoothie", image: "🥥" },
        { id: 696, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
        { id: 697, name: "Sinh tố bơ dừa", price: 38000, description: "Sinh tố bơ dừa thơm ngon", category: "smoothie", image: "🥑" },
        { id: 698, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" },
        { id: 699, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
        { id: 700, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu mát lạnh", category: "juice", image: "🍉" }
    ]},
    { id: 71, name: "Athlete Lab", description: "Cà phê specialty cho sinh viên thể thao", rating: 4.7, deliveryTime: "18-25 phút", location: "Gần ĐH Thể thao và Du lịch", universityId: 12, menu: [
        { id: 701, name: "Espresso", price: 25000, description: "Espresso đậm đà", category: "coffee", image: "☕" },
        { id: 702, name: "Americano", price: 28000, description: "Americano thơm ngon", category: "coffee", image: "☕" },
        { id: 703, name: "Cappuccino", price: 35000, description: "Cappuccino Ý đậm đà", category: "coffee", image: "☕" },
        { id: 704, name: "Macchiato", price: 40000, description: "Macchiato thơm ngon", category: "coffee", image: "☕" },
        { id: 705, name: "Trà sữa matcha", price: 30000, description: "Trà sữa matcha Nhật Bản", category: "tea", image: "🍵" },
        { id: 706, name: "Trà sữa thái", price: 24000, description: "Trà sữa thái đặc biệt", category: "tea", image: "🧋" },
        { id: 707, name: "Sinh tố xoài dứa", price: 35000, description: "Sinh tố xoài dứa nhiệt đới", category: "smoothie", image: "🥭" },
        { id: 708, name: "Sinh tố dâu tây", price: 32000, description: "Sinh tố dâu tây tươi", category: "smoothie", image: "🍓" },
        { id: 709, name: "Nước ép cam tươi", price: 25000, description: "Nước ép cam tươi nguyên chất", category: "juice", image: "🍊" },
        { id: 710, name: "Nước ép táo xanh", price: 22000, description: "Nước ép táo xanh tươi", category: "juice", image: "🍏" }
    ]},
    { id: 72, name: "Sports Bubble", description: "Trà sữa trân châu cho sinh viên thể thao", rating: 4.2, deliveryTime: "12-18 phút", location: "Gần ĐH Thể thao và Du lịch", universityId: 12, menu: [
        { id: 711, name: "Cà phê sữa đá", price: 18000, description: "Cà phê sữa đá truyền thống", category: "coffee", image: "☕" },
        { id: 712, name: "Cà phê nâu", price: 22000, description: "Cà phê nâu thơm ngon", category: "coffee", image: "☕" },
        { id: 713, name: "Trà sữa trân châu", price: 25000, description: "Trà sữa trân châu đen", category: "tea", image: "🧋" },
        { id: 714, name: "Trà sữa trân châu đường đen", price: 28000, description: "Trà sữa trân châu đường đen", category: "tea", image: "🧋" },
        { id: 715, name: "Trà sữa socola", price: 25000, description: "Trà sữa socola ngọt ngào", category: "tea", image: "🧋" },
        { id: 716, name: "Trà sữa dâu tây", price: 30000, description: "Trà sữa dâu tây thơm ngon", category: "tea", image: "🧋" },
        { id: 717, name: "Sinh tố bơ", price: 30000, description: "Sinh tố bơ tươi ngon", category: "smoothie", image: "🥑" },
        { id: 718, name: "Sinh tố chuối", price: 25000, description: "Sinh tố chuối bổ dưỡng", category: "smoothie", image: "🍌" },
        { id: 719, name: "Nước ép dưa hấu", price: 18000, description: "Nước ép dưa hấu tươi", category: "juice", image: "🍉" },
        { id: 720, name: "Nước ép cà rốt", price: 20000, description: "Nước ép cà rốt tươi", category: "juice", image: "🥕" }
    ]}
];

// Thêm 2 cửa hàng đồ ăn cho mỗi trường (tạo động để không phải chỉnh sửa thủ công)
(function addFoodStoresPerUniversity() {
    // Tìm id tiếp theo cho store và item để tránh trùng
    let nextStoreId = Math.max(...stores.map(s => s.id)) + 1;
    let nextItemId = Math.max(...stores.flatMap(s => s.menu.map(m => m.id))) + 1;

    universities.forEach(u => {
        const baseLocation = `Gần ${u.shortName || u.name}`;

        // Hai menu khác nhau để đa dạng món và ảnh
        const menuA = [
            { id: nextItemId++, name: "Bánh mì thịt", price: 25000, description: "Bánh mì Việt Nam truyền thống", category: "food" },
            { id: nextItemId++, name: "Cơm gà", price: 38000, description: "Cơm gà xé, sốt mặn ngọt", category: "food" },
            { id: nextItemId++, name: "Mì xào bò", price: 42000, description: "Mì xào bò rau củ", category: "food" },
            { id: nextItemId++, name: "Gà rán", price: 45000, description: "Đùi gà rán giòn", category: "food" },
            { id: nextItemId++, name: "Khoai tây chiên", price: 22000, description: "Khoai tây chiên vàng giòn", category: "food" },
            { id: nextItemId++, name: "Salad rau trộn", price: 32000, description: "Rau xanh, sốt chua ngọt", category: "food" }
        ];

        const menuB = [
            { id: nextItemId++, name: "Phở bò", price: 45000, description: "Phở bò tái chín", category: "food" },
            { id: nextItemId++, name: "Bún chả", price: 40000, description: "Bún chả Hà Nội", category: "food" },
            { id: nextItemId++, name: "Cơm tấm sườn", price: 42000, description: "Cơm tấm sườn bì chả", category: "food" },
            { id: nextItemId++, name: "Bánh mì ốp la", price: 25000, description: "Bánh mì trứng ốp la", category: "food" },
            { id: nextItemId++, name: "Mì xào hải sản", price: 48000, description: "Mì xào tôm mực", category: "food" },
            { id: nextItemId++, name: "Salad Caesar", price: 35000, description: "Romaine, gà xé, sốt Caesar", category: "food" }
        ];

        // Tên cửa hàng khác nhau theo trường và loại
        const foodStore1 = {
            id: nextStoreId++,
            name: `Quán Cơm ${u.shortName || u.name}`,
            description: "Cơm - mì - salad ngon, nhanh, giá sinh viên",
            rating: 4.5,
            deliveryTime: "12-18 phút",
            location: baseLocation,
            universityId: u.id,
            menu: menuA
        };

        const foodStore2 = {
            id: nextStoreId++,
            name: `Ăn Vặt ${u.shortName || u.name}`,
            description: "Món Việt quen thuộc, no bụng mỗi ngày",
            rating: 4.4,
            deliveryTime: "15-22 phút",
            location: baseLocation,
            universityId: u.id,
            menu: menuB
        };

        stores.push(foodStore1, foodStore2);
    });
})();

// Telegram Bot Configuration - Sử dụng environment variables trên Vercel
// TELEGRAM_BOT_TOKEN và TELEGRAM_CHAT_ID được cấu hình trong Vercel dashboard

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderUniversities();
    setupEventListeners();
});

// Render universities
function renderUniversities() {
    const universityGrid = document.getElementById('universityGrid');
    universityGrid.innerHTML = '';

    universities.forEach(university => {
        const universityCard = document.createElement('div');
        universityCard.className = 'university-card';
        universityCard.onclick = () => selectUniversity(university);

        // Tính số cửa hàng hiển thị: tối đa 3 đồ uống + 2 đồ ăn
        const uniStores = stores.filter(store => store.universityId === university.id);
        const drinkStoresCount = uniStores.filter(s => !s.menu.every(i => i.category === 'food')).length;
        const foodStoresCount = uniStores.filter(s => s.menu.every(i => i.category === 'food')).length;
        const visibleStoreCount = Math.min(3, drinkStoresCount) + Math.min(2, foodStoresCount);
        
        universityCard.innerHTML = `
            <div class="university-icon">
                <img src="${university.logo}" alt="${university.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='${university.icon}';">
            </div>
            <div class="university-info">
                <h3>${university.name}</h3>
                <p>${university.description}</p>
                <div class="university-stats">
                    <div class="stat-item">
                        <div class="stat-number">${university.studentCount}</div>
                        <div>Sinh viên</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${visibleStoreCount}</div>
                        <div>Cửa hàng</div>
                    </div>
                    <div class="stat-item">
                        <div>${university.location}</div>
                    </div>
                </div>
            </div>
        `;
        
        universityGrid.appendChild(universityCard);
    });
}

// Select university and show stores
function selectUniversity(university) {
    currentUniversity = university;
    
    // Update UI
    document.getElementById('universitySection').style.display = 'none';
    document.getElementById('storeSection').style.display = 'block';
    
    // Remove previous selection
    document.querySelectorAll('.university-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to current university
    event.currentTarget.classList.add('selected');
    
    renderStores();
}

// Render stores
function renderStores() {
    const storeGrid = document.getElementById('storeGrid');
    storeGrid.innerHTML = '';

    // Filter stores by selected university
    const filteredStores = stores.filter(store => store.universityId === currentUniversity.id);
    // Ưu tiên 3 cửa hàng đồ uống + 2 cửa hàng đồ ăn (nếu có)
    const drinkStores = filteredStores.filter(s => !s.menu.every(i => i.category === 'food'));
    const foodStores = filteredStores.filter(s => s.menu.every(i => i.category === 'food'));
    const limitedStores = [...drinkStores.slice(0, 3), ...foodStores.slice(0, 2)];

    limitedStores.forEach(store => {
        const storeCard = document.createElement('div');
        storeCard.className = 'store-card';
        storeCard.onclick = () => selectStore(store);
        
        storeCard.innerHTML = `
            <div class="store-info">
                <h3>${store.name}</h3>
                <p>${store.description}</p>
                <div class="store-meta">
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${store.rating}</span>
                    </div>
                    <span><i class="fas fa-clock"></i> ${store.deliveryTime}</span>
                </div>
            </div>
        `;
        
        storeGrid.appendChild(storeCard);
    });
}

// Select store and show menu
function selectStore(store) {
    currentStore = store;
    
    // Update UI
    document.getElementById('storeSection').style.display = 'none';
    document.getElementById('menuSection').style.display = 'block';
    document.getElementById('storeName').textContent = store.name;
    
    // Remove previous selection
    document.querySelectorAll('.store-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to current store
    event.currentTarget.classList.add('selected');
    
    renderMenu();
}

// Render menu items
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    let filteredMenu = currentStore.menu;
    if (currentCategory !== 'all') {
        filteredMenu = currentStore.menu.filter(item => item.category === currentCategory);
    }

    filteredMenu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        
        const imageUrl = getDrinkImage(item.name, item.category);
        
        menuItem.innerHTML = `
            <div class="item-image">
                <img src="${imageUrl}" alt="${item.name}" loading="lazy" onerror="this.src='${drinkImages['default-' + item.category]}'">
            </div>
            <div class="item-header">
                <div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${formatPrice(item.price)}</div>
                </div>
            </div>
            <div class="item-description">${item.description}</div>
            <div class="item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="quantity" id="qty-${item.id}">0</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    Thêm vào giỏ
                </button>
            </div>
        `;
        
        menuGrid.appendChild(menuItem);
    });
}

// Category filtering
function setupEventListeners() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            currentCategory = this.dataset.category;
            renderMenu();
        });
    });
}

// Quantity controls
function increaseQuantity(itemId) {
    const quantityElement = document.getElementById(`qty-${itemId}`);
    let quantity = parseInt(quantityElement.textContent) || 0;
    quantityElement.textContent = quantity + 1;
}

function decreaseQuantity(itemId) {
    const quantityElement = document.getElementById(`qty-${itemId}`);
    let quantity = parseInt(quantityElement.textContent) || 0;
    if (quantity > 0) {
        quantityElement.textContent = quantity - 1;
    }
}

// Add to cart
function addToCart(itemId) {
    const quantityElement = document.getElementById(`qty-${itemId}`);
    const quantity = parseInt(quantityElement.textContent) || 0;
    
    if (quantity === 0) {
        alert('Vui lòng chọn số lượng!');
        return;
    }
    
    const item = currentStore.menu.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...item,
            quantity: quantity,
            storeName: currentStore.name
        });
    }
    
    // Reset quantity
    quantityElement.textContent = '0';
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showNotification('Đã thêm vào giỏ hàng!');
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
    
    if (cartSidebar.classList.contains('open')) {
        renderCartItems();
    }
}

// Render cart items
function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Giỏ hàng trống</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.image} ${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)} x ${item.quantity}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn decrease-btn" data-item-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase-btn" data-item-id="${item.id}">+</button>
                <button class="quantity-btn delete-btn" data-item-id="${item.id}" style="background: #ff4757;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Thêm event listeners cho các nút
        const decreaseBtn = cartItem.querySelector('.decrease-btn');
        const increaseBtn = cartItem.querySelector('.increase-btn');
        const deleteBtn = cartItem.querySelector('.delete-btn');
        
        decreaseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateCartQuantity(item.id, -1);
        });
        
        increaseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateCartQuantity(item.id, 1);
        });
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromCart(item.id);
        });
        
        cartItems.appendChild(cartItem);
    });
    
    // Update total với phí ship
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const shippingFee = calculateShippingFee(totalItems);
    const total = subtotal + shippingFee;
    
    document.getElementById('cartTotal').textContent = formatPrice(total);
    
    // Hiển thị phí ship nếu có element
    const shippingFeeElement = document.getElementById('shippingFee');
    if (shippingFeeElement) {
        shippingFeeElement.textContent = formatPrice(shippingFee);
    }
    
    const subtotalElement = document.getElementById('cartSubtotal');
    if (subtotalElement) {
        subtotalElement.textContent = formatPrice(subtotal);
    }
}

// Tính phí ship dựa trên số lượng sản phẩm
function calculateShippingFee(totalItems) {
    if (totalItems === 0) return 0;
    if (totalItems >= 1 && totalItems <= 3) return 10000;
    return 20000; // 3 sản phẩm trở lên
}

// Update cart quantity
function updateCartQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== itemId);
        }
        renderCartItems();
        updateCartCount();
    }
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCartItems();
    updateCartCount();
}

// Go back to universities
function goBackToUniversities() {
    document.getElementById('universitySection').style.display = 'block';
    document.getElementById('storeSection').style.display = 'none';
    document.getElementById('menuSection').style.display = 'none';
    currentStore = null;
    
    // Giữ lại trạng thái selected của trường đại học
    if (currentUniversity) {
        // Tìm và highlight lại trường đại học đã chọn
        const universityCards = document.querySelectorAll('.university-card');
        universityCards.forEach(card => {
            card.classList.remove('selected');
        });
        
        // Tìm trường đại học hiện tại và thêm class selected
        const currentUniversityCard = Array.from(universityCards).find(card => {
            const universityName = card.querySelector('h3').textContent;
            return universityName === currentUniversity.name;
        });
        
        if (currentUniversityCard) {
            currentUniversityCard.classList.add('selected');
        }
    }
}

// Go back to stores
function goBackToStores() {
    document.getElementById('storeSection').style.display = 'block';
    document.getElementById('menuSection').style.display = 'none';
    currentStore = null;
}

// Show checkout modal
function showCheckout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    
    document.getElementById('checkoutModal').classList.add('show');
}

// Close checkout modal
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('show');
}

// Close success modal
function closeSuccess() {
    document.getElementById('successModal').classList.remove('show');
}

// Convert file to base64
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Handle payment method change
document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            const transferInfo = document.getElementById('transferPaymentInfo');
            if (this.value === 'transfer') {
                transferInfo.style.display = 'block';
            } else {
                transferInfo.style.display = 'none';
            }
        });
    });
});

// Handle checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const deliveryAddress = document.getElementById('deliveryAddress').value;
    const notes = document.getElementById('notes').value;
    
    // Get payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'cash';
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const shippingFee = calculateShippingFee(totalItems);
    const total = subtotal + shippingFee;
    
    // Create order object
    const order = {
        customer: {
            name: customerName,
            phone: customerPhone,
            address: deliveryAddress,
            notes: notes
        },
        university: currentUniversity.name,
        store: currentStore.name,
        items: cart,
        subtotal: subtotal,
        shippingFee: shippingFee,
        total: total,
        timestamp: new Date().toLocaleString('vi-VN'),
        paymentMethod: paymentMethod
    };
    
    // Handle transfer payment
    if (paymentMethod === 'transfer') {
        const screenshotFile = document.getElementById('paymentScreenshot')?.files[0];
        
        if (!screenshotFile) {
            alert('Vui lòng tải lên ảnh xác nhận đã chuyển khoản!');
            return;
        }
        
        // Convert screenshot to base64
        order.paymentScreenshot = await convertFileToBase64(screenshotFile);
    }
    
    // Send to Telegram
    const telegramSuccess = await sendToTelegram(order);
    
    // Close checkout modal
    closeCheckout();
    
    // Show success modal
    document.getElementById('successModal').classList.add('show');
    
    // Show additional info if Telegram failed
    if (!telegramSuccess) {
        setTimeout(() => {
            alert('Đơn hàng đã được lưu nhưng chưa thể gửi thông báo qua Telegram. Vui lòng kiểm tra console để xem chi tiết đơn hàng.');
        }, 1000);
    }
    
    // Clear cart
    cart = [];
    updateCartCount();
    renderCartItems();
    
    // Reset form
    document.getElementById('checkoutForm').reset();
});

// Send order to Telegram via API route
async function sendToTelegram(order) {
    try {
        const response = await fetch('/api/send-telegram.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order })
        });
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.warn('API endpoint not found or not returning JSON. Using fallback method.');
            return await sendToTelegramFallback(order);
        }
        
        const result = await response.json();
        
        if (response.ok) {
            console.log('Order sent to Telegram successfully:', result.message);
            return true;
        } else {
            console.error('Failed to send order to Telegram:', result.error);
            return await sendToTelegramFallback(order);
        }
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return await sendToTelegramFallback(order);
    }
}

// Fallback method when API is not available
async function sendToTelegramFallback(order) {
    try {
        // Log order details to console for manual processing
        console.log('=== ORDER DETAILS (FALLBACK) ===');
        console.log('University:', order.university);
        console.log('Store:', order.store);
        console.log('Customer:', order.customer);
        console.log('Items:', order.items);
        console.log('Total:', order.total);
        console.log('Timestamp:', order.timestamp);
        console.log('=== END ORDER DETAILS ===');
        
        // Show alert to user
        alert('Đơn hàng đã được lưu! Vui lòng liên hệ trực tiếp để xác nhận đơn hàng.');
        
        return true;
    } catch (error) {
        console.error('Fallback method failed:', error);
        return false;
    }
}

// Format order message for Telegram
function formatOrderMessage(order) {
    let message = `🛍️ <b>ĐƠN HÀNG MỚI</b>\n\n`;
    message += `🎓 <b>Trường:</b> ${order.university}\n`;
    message += `🏪 <b>Cửa hàng:</b> ${order.store}\n`;
    message += `👤 <b>Khách hàng:</b> ${order.customer.name}\n`;
    message += `📞 <b>Số điện thoại:</b> ${order.customer.phone}\n`;
    message += `📍 <b>Địa chỉ:</b> ${order.customer.address}\n`;
    
    if (order.customer.notes) {
        message += `📝 <b>Ghi chú:</b> ${order.customer.notes}\n`;
    }
    
    message += `\n📋 <b>Chi tiết đơn hàng:</b>\n`;
    
    order.items.forEach(item => {
        message += `• ${item.image} ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    message += `\n💰 <b>Tổng cộng:</b> ${formatPrice(order.total)}\n`;
    message += `💳 <b>Thanh toán:</b> ${order.paymentMethod === 'cash' ? 'Tiền mặt khi nhận hàng' : 'Chuyển khoản (có kèm ảnh)'}\n`;
    message += `⏰ <b>Thời gian:</b> ${order.timestamp}`;
    
    return message;
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        cartSidebar.classList.remove('open');
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});
