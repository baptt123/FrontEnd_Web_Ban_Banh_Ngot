// images
import blogImg1 from "../images/blog/img-1.jpg";
import blogImg2 from "../images/blog/img-2.jpg";
import blogImg3 from "../images/blog/img-3.jpg";

import blogAvaterImg1 from "../images/blog/blog-avater/img-1.jpg";
import blogAvaterImg2 from "../images/blog/blog-avater/img-2.jpg";
import blogAvaterImg3 from "../images/blog/blog-avater/img-3.jpg";

import blogSingleImg1 from "../images/blog/img-5.jpg";
import blogSingleImg2 from "../images/blog/img-6.jpg";
import blogSingleImg3 from "../images/blog/img-7.jpg";



const blogs = [
    {
        id: '1',
        title: 'Bí quyết làm bánh cupcake mềm mịn và thơm ngon',
        screens: blogImg1,
        description: 'Khám phá những bí quyết và mẹo nhỏ để làm ra những chiếc bánh cupcake hoàn hảo, từ việc chọn nguyên liệu đến kỹ thuật trộn bột và nướng bánh.',
        author: 'Nguyễn Thị Hương',
        authorTitle:'Đầu bếp bánh ngọt',
        authorImg:blogAvaterImg1,
        create_at: '14/08/2023',
        blogSingleImg:blogSingleImg1, 
        comment:'35',
        blClass:'format-standard-image',
    },
    {
        id: '2',
        title: 'Xu hướng trang trí bánh kem năm 2023',
        screens: blogImg2,
        description: 'Cập nhật những xu hướng trang trí bánh kem mới nhất năm 2023, từ phong cách tối giản đến những thiết kế cầu kỳ, đầy màu sắc.',
        author: 'Trần Văn Minh',
        authorTitle:'Chuyên gia trang trí bánh',
        authorImg:blogAvaterImg2,
        create_at: '16/08/2023',
        blogSingleImg:blogSingleImg2, 
        comment:'80',
        blClass:'format-standard-image',
    },
    {
        id: '3',
        title: 'Cách bảo quản bánh tươi ngon lâu hơn',
        screens: blogImg3,
        description: 'Hướng dẫn chi tiết về cách bảo quản các loại bánh khác nhau để giữ được độ tươi ngon và hương vị trong thời gian dài nhất.',
        author: 'Lê Thị Mai',
        authorTitle:'Chuyên gia ẩm thực',
        authorImg:blogAvaterImg3,
        create_at: '18/08/2023',
        blogSingleImg:blogSingleImg3,
        comment:'95',
        blClass:'format-video',
    },
];
export default blogs;