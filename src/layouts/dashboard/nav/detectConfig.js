// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const dataConfig = [
    {
        title: 'Exfiltration 1',
        path: '/detection/exfiltration1',
        icon: icon('ic_sec'),
    },
    {
        title: 'Exfiltration 2',
        path: '/detection/exfiltration2',
        icon: icon('ic_sec2'),
    },
    {
        title: 'Exfiltration 3',
        path: '/detection/exfiltration3',
        icon: icon('ic_sec3'),
    },
    {
        title: 'Command and Control',
        path: '/detection/C&C',
        icon: icon('ic_sec4'),
    },
    {
        title: 'Internal Peer 2 Peer',
        path: '/detection/P2P',
        icon: icon('ic_sec5'),
    },
    {
        title: 'Botnet',
        path: '/detection/botnet',
        icon: icon('ic_sec6'),
    },
    {
        title: 'Malware Controller',
        path: '/detection/malwarecontrol',
        icon: icon('ic_sec7'),
    },
    {
        title: 'Infected Host',
        path: '/detection/infectedhost',
        icon: icon('ic_sec8'),
    },
    {
        title: 'Lateral Brute',
        path: '/detection/lateralbrute',
        icon: icon('ic_sec9'),
    },
    {
        title: 'Lateral Spy',
        path: '/detection/lateralspy',
        icon: icon('ic_sec10'),
    },

];

export default dataConfig;
