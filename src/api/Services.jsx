/* Hình ảnh chính */
import img1 from '../images/service/img-1.jpg'
import img2 from '../images/service/img-2.jpg'
import img3 from '../images/service/img-3.jpg'
import img4 from '../images/service/img-4.jpg'

/* Icon */
import sion1 from '../images/service/break-cake.svg'
import sion2 from '../images/service/donut.svg'
import sion3 from '../images/service/donut.svg'
import sion4 from '../images/service/break-cake.svg'

/* Hình chi tiết */
import Simg1 from '../images/service-single/img1.jpg'
import Simg2 from '../images/service-single/img2.jpg'
import Simg3 from '../images/service-single/img3.jpg'
import Simg4 from '../images/service-single/img3.jpg'

const Services = [
    {
        id: 1,
        icon: sion1,
        simage: img1,
        imag: Simg1,
        title: 'Bánh kem',
        description: 'Chúng tôi có đội ngũ chuyên gia giàu kinh nghiệm, luôn sẵn sàng hỗ trợ bạn với chất lượng dịch vụ tốt nhất.',
        slug: 'Bánh kem'
    },
    {
        id: 2,
        icon: sion2,
        simage: img2,
        imag: Simg2,
        title: 'Banh ngọt',
        description: 'Chúng tôi có đội ngũ chuyên gia giàu kinh nghiệm, luôn sẵn sàng hỗ trợ bạn với chất lượng dịch vụ tốt nhất.',
        slug: 'Banh ngot'
    },
    {
        id: 3,
        icon: sion3,
        simage: img3,
        imag: Simg3,
        title: 'Banh ngọt',
        description: 'Chúng tôi có đội ngũ chuyên gia giàu kinh nghiệm, luôn sẵn sàng hỗ trợ bạn với chất lượng dịch vụ tốt nhất.',
        slug: 'Banh ngọt'
    },
    {
        id: 4,
        icon: sion4,
        simage: img4,
        imag: Simg4,
        title: 'Banh healthy',
        description: 'Chúng tôi có đội ngũ chuyên gia giàu kinh nghiệm, luôn sẵn sàng hỗ trợ bạn với chất lượng dịch vụ tốt nhất.',
        slug: 'Banh healthy'
    }
];

export default Services;
