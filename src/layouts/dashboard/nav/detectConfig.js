// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const dataConfig = [
    {
        title: 'Exfiltration 1',
        path: '/detection/exfiltration1',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Exfiltration 2',
        path: '/detection/exfiltration2',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Exfiltration 3',
        path: '/detection/exfiltration3',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Command and Control',
        path: '/detection/C&C',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Internal Peer 2 Peer',
        path: '/detection/P2P',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Botnet',
        path: '/detection/botnet',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Malware Controller',
        path: '/detection/malwarecontrol',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Infected Host',
        path: '/detection/infectedhost',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Lateral Brute',
        path: '/detection/lateralbrute',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Lateral Spy',
        path: '/detection/lateralspy',
        icon: icon('ic_analytics'),
    },
    // {
    //   title: 'Employees',
    //   path: '/dashboard/user',
    //   icon: icon('ic_user'),
    // },
    {
        title: 'news',
        path: '/dashboard/news',
        icon: icon('ic_cart'),
    },
    // {
    //   title: 'blog',
    //   path: '/dashboard/blog',
    //   icon: icon('ic_blog'),
    // },
    // {
    //   title: 'Add Product',
    //   path: '/dashboard/scanbarcode',
    //   icon: icon('ic_add')
    // },
    // {
    //   title: 'schedule',
    //   path: '/dashboard/schedule',
    //   icon: icon('ic_schedule')
    // },
];

export default dataConfig;
