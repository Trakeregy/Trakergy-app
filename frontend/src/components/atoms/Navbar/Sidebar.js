import React from 'react';
import { Box, CloseButton, Flex } from '@chakra-ui/react';
import { NavItem } from '.';
import {
    CalendarIcon,
    ChartIcon,
    LogOutIcon,
    MoneyIcon,
    SettingsIcon,
    TripIcon,
} from '../icons';
import ROUTES from '../../../utils/routes';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { logOut as logOutAction } from '../../../state/actions/auth';

function Sidebar({ onClose, logOut, ...rest }) {
    const { t } = useTranslation();

    const LinkItems = [
        { name: t('trips'), icon: TripIcon, route: ROUTES.HOME },
        { name: t('statistics'), icon: ChartIcon, route: ROUTES.STATISTICS },
        { name: t('calendar'), icon: CalendarIcon, route: ROUTES.CALENDAR },
        { name: t('debts'), icon: MoneyIcon, route: ROUTES.DEBTS },
    ];

    return (
        <Box
            bg='transparent'
            pos='fixed'
            w={{ base: 'full', md: 150, lg: 150 }}
            h='100%'
            p={{ base: 0, md: 6, lg: 6 }}
            {...rest}
            zIndex={2}
        >
            <Flex
                w='full'
                h='full'
                bg='white'
                py={5}
                pt={130}
                borderRadius={20}
                flexDir='column'
                alignItems={{
                    base: 'flex-start',
                    md: 'center',
                    lg: 'center',
                }}
            >
                <Flex
                    h='20'
                    alignItems='center'
                    mx='8'
                    justifyContent='space-between'
                    display={{ base: 'flex', md: 'none' }}
                >
                    <CloseButton onClick={onClose} />
                </Flex>

                {LinkItems.map((link) => (
                    <NavItem
                        key={link.name}
                        icon={link.icon}
                        text={link.name}
                        link={link.route}
                    />
                ))}
                <Box h='full' />
                <NavItem
                    key={'settings'}
                    icon={SettingsIcon}
                    text={t('settings')}
                    link={ROUTES.SETTINGS}
                />
                <NavItem
                    key={'logout'}
                    icon={LogOutIcon}
                    text={t('log-out')}
                    onClick={logOut}
                />
            </Flex>
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOutAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
