import { h } from 'vue';

export function getSportsMenuOptions(t: (key: string) => string) {
  return [
    {
      label: t('sport_type.1'),
      key: 'soccer',
      icon: () => h('img', { src: '/images/sports/soccer.png', style: 'width: 20px; height: 20px;' })
    },
    {
      label: t('sport_type.2'),
      key: 'basketball',
      icon: () => h('img', { src: '/images/sports/basketball.png', style: 'width: 20px; height: 20px;' })
    },
    {
      label: t('sport_type.3'),
      key: 'tennis',
      icon: () => h('img', { src: '/images/sports/tennis.png', style: 'width: 20px; height: 20px;' })
    },
    {
      label: t('sport_type.6'),
      key: 'baseball',
      icon: () => h('img', { src: '/images/sports/baseball.png', style: 'width: 20px; height: 20px;' })
    },
    {
      label: t('sport_type.5'),
      key: 'tableTennis',
      icon: () => h('img', { src: '/images/sports/table-tennis.png', style: 'width: 20px; height: 20px;' })
    },
    {
      label: t('sport_type.4'),
      key: 'volleyball',
      icon: () => h('img', { src: '/images/sports/volleyball.png', style: 'width: 20px; height: 20px;' })
    },
  ];
}
