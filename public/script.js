// Global variables
let currentUniversity = null;
let currentStore = null;
let cart = [];
let currentCategory = 'all';

// University data
const universities = [
    {
        id: 1,
        name: "Đại học Bách Khoa Hà Nội",
        shortName: "Bách Khoa",
        icon: "🏛️",
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
        description: "Trường đại học thương mại quốc tế",
        studentCount: "25,000+",
        storeCount: "6",
        location: "Cầu Giấy, Hà Nội"
    },
    {
        id: 4,
        name: "Đại học Quốc gia TP.HCM",
        shortName: "VNU-HCM",
        icon: "🎓",
        description: "Hệ thống đại học lớn nhất phía Nam",
        studentCount: "60,000+",
        storeCount: "6",
        location: "Quận 1, TP.HCM"
    },
    {
        id: 5,
        name: "Đại học Sư phạm Hà Nội",
        shortName: "SPHN",
        icon: "📚",
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
        description: "Trường đại học y khoa uy tín",
        studentCount: "20,000+",
        storeCount: "6",
        location: "Đống Đa, Hà Nội"
    }
];

// Store data - mỗi trường có 6 cửa hàng, mỗi cửa hàng có 10 món chia đều các loại
const stores = [
    // ĐH Bách Khoa - 6 cửa hàng
    {
        id: 1,
        name: "Café Sinh Viên BK",
        description: "Cà phê ngon, giá sinh viên",
        rating: 4.5,
        deliveryTime: "15-20 phút",
        location: "Gần ĐH Bách Khoa",
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
        name: "Coffee House BK",
        description: "Cà phê specialty cao cấp",
        rating: 4.8,
        deliveryTime: "20-25 phút",
        location: "Gần ĐH Bách Khoa",
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
        name: "Bubble Tea BK",
        description: "Trà sữa trân châu đa dạng",
        rating: 4.3,
        deliveryTime: "15-20 phút",
        location: "Gần ĐH Bách Khoa",
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
        name: "Smoothie Corner BK",
        description: "Sinh tố và nước ép tươi",
        rating: 4.7,
        deliveryTime: "12-18 phút",
        location: "Gần ĐH Bách Khoa",
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
        name: "Fresh Juice Bar BK",
        description: "Nước ép tươi ngon",
        rating: 4.6,
        deliveryTime: "10-15 phút",
        location: "Gần ĐH Bách Khoa",
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
        name: "Tea Garden BK",
        description: "Trà truyền thống và hiện đại",
        rating: 4.5,
        deliveryTime: "12-18 phút",
        location: "Gần ĐH Bách Khoa",
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
        name: "Café Kinh Tế",
        description: "Cà phê cho sinh viên kinh tế",
        rating: 4.4,
        deliveryTime: "12-18 phút",
        location: "Gần ĐH Kinh Tế",
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
        name: "Tea House NEU",
        description: "Trà và đồ uống nhẹ",
        rating: 4.6,
        deliveryTime: "10-15 phút",
        location: "Gần ĐH Kinh Tế",
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
        location: "Gần ĐH Kinh Tế",
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
        location: "Gần ĐH Kinh Tế",
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
        location: "Gần ĐH Kinh Tế",
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
        location: "Gần ĐH Kinh Tế",
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
    }
];

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
        
        universityCard.innerHTML = `
            <div class="university-icon">${university.icon}</div>
            <div class="university-info">
                <h3>${university.name}</h3>
                <p>${university.description}</p>
                <div class="university-stats">
                    <div class="stat-item">
                        <div class="stat-number">${university.studentCount}</div>
                        <div>Sinh viên</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${university.storeCount}</div>
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

    filteredStores.forEach(store => {
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
                    <span>${store.deliveryTime}</span>
                    <span>${store.location}</span>
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
        
        menuItem.innerHTML = `
            <div class="item-header">
                <div>
                    <div class="item-name">${item.image} ${item.name}</div>
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
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="background: #ff4757;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = formatPrice(total);
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

// Handle checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const deliveryAddress = document.getElementById('deliveryAddress').value;
    const notes = document.getElementById('notes').value;
    
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
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        timestamp: new Date().toLocaleString('vi-VN')
    };
    
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
        const response = await fetch('/api/send-telegram', {
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
