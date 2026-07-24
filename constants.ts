import { Ingredient, PresetConfig } from './types';

export const INGREDIENTS: Ingredient[] = [
  { id: 'ing1', name: 'Pink Grapefruit', hex: '#FDADD8' },
  { id: 'ing2', name: 'Deep Berry', hex: '#E54C9F' },
  { id: 'ing3', name: 'Lemon Zest', hex: '#FFF49B' },
  { id: 'ing4', name: 'Sunny Lime', hex: '#FFE830' },
  { id: 'ing5', name: 'Electric Violet', hex: '#AB00E2' },
  { id: 'ing6', name: 'Midnight Plum', hex: '#300041' },
  { id: 'ing7', name: 'Soft Lilac', hex: '#ECB2FF' },
  { id: 'ing8', name: 'Cyan Punch', hex: '#00FFFF' },
  { id: 'ing9', name: 'Pure White', hex: '#FFFFFF' },
  { id: 'ing10', name: 'Rich Black', hex: '#000000' },
];

export const INITIAL_TYPE_1: PresetConfig = {
  "id": "type1",
  "name": "Soft Bloom",
  "viewBox": "0 0 1452 1080",
  "width": 1452,
  "height": 1080,
  "layers": [
    {
      "id": "t1_l1",
      "name": "Layer 1",
      "color": "#FDADD8",
      "blur": 94,
      "opacity": 1,
      "x": 726,
      "y": 487,
      "baseRx": 526,
      "baseRy": 525,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "blendMode": "normal"
    },
    {
      "id": "t1_l2",
      "name": "Layer 2",
      "color": "#E54C9F",
      "blur": 87,
      "opacity": 1,
      "x": 726,
      "y": 555,
      "baseRx": 429,
      "baseRy": 428,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "blendMode": "normal"
    },
    {
      "id": "t1_l3",
      "name": "Layer 3",
      "color": "#FFF49B",
      "blur": 27,
      "opacity": 1,
      "x": 726,
      "y": 818,
      "baseRx": 233,
      "baseRy": 116.5,
      "scaleX": 1.1,
      "scaleY": 1.1,
      "rotation": 0,
      "blendMode": "normal"
    },
    {
      "id": "t1_l4",
      "name": "Layer 4",
      "color": "#FFE830",
      "blur": 54,
      "opacity": 1,
      "x": 726,
      "y": 707,
      "baseRx": 235,
      "baseRy": 142.5,
      "scaleX": 1,
      "scaleY": 1,
      "rotation": 0,
      "blendMode": "normal"
    }
  ]
}

const PATH_1 = "M1964 0H1745.65C1561.47 284.744 1284.32 467.594 973.63 472.629C969.245 472.729 964.86 472.729 960.475 472.729C956.09 472.729 951.705 472.729 947.32 472.629C636.68 467.594 359.525 284.744 175.354 0H-58V1081H175.404C359.575 796.306 636.68 613.456 947.32 608.421C951.705 608.321 956.09 608.321 960.475 608.321C964.86 608.321 969.245 608.321 973.63 608.421C1284.32 613.456 1561.42 796.306 1745.6 1081H1979V0H1964Z";
const PATH_2 = "M1979 0V1081H1963.95C1727.76 795.409 1372.12 612.309 973.63 608.421C969.245 608.321 964.86 608.321 960.475 608.321C956.09 608.321 951.705 608.321 947.32 608.421C548.83 612.309 193.193 795.409 -42.9513 1081H-58V0H-43.0012C193.143 285.591 548.83 468.741 947.32 472.629C951.705 472.729 956.09 472.729 960.475 472.729C964.86 472.729 969.245 472.729 973.63 472.629C1372.12 468.741 1727.81 285.591 1964 0H1979Z";
const PATH_3 = "M960.475 540.525C556.105 540.525 192.645 715.848 -58 994.66V86.2905C192.645 365.152 556.105 540.525 960.475 540.525Z";
const PATH_4 = "M1979 86.2905V994.66C1728.35 715.848 1364.89 540.525 960.475 540.525C1364.84 540.525 1728.3 365.152 1979 86.2905Z";

export const INITIAL_TYPE_2: PresetConfig = {
  id: 'type2',
  name: 'Abstract Flow',
  viewBox: '0 0 1920 1080',
  width: 1920,
  height: 1080,
  layers: [
    {
      id: 't2_l1',
      name: 'Layer 1',
      color: '#ECB2FF',
      blur: 50,
      opacity: 1,
      x: 0,
      y: 0,
      pathData: PATH_1,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      blendMode: 'normal'
    },
    {
      id: 't2_l2',
      name: 'Layer 2',
      color: '#AB00E2',
      blur: 40,
      opacity: 1,
      x: 0,
      y: 0,
      pathData: PATH_2,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      blendMode: 'normal'
    },
    {
      id: 't2_l3',
      name: 'Layer 3',
      color: '#300041',
      blur: 75,
      opacity: 1,
      x: 0,
      y: 0,
      pathData: PATH_3,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      blendMode: 'normal'
    },
    {
      id: 't2_l4',
      name: 'Layer 4',
      color: '#300041',
      blur: 75,
      opacity: 1,
      x: 0,
      y: 0,
      pathData: PATH_4,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      blendMode: 'normal'
    }
  ]
};