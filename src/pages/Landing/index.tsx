import React, { useEffect, useState } from 'react';
import {View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImg from '../../assets/images/landing.png';
import stydyIcon from '../../assets/images/icons/study.png';
import giveClessesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../serveces/api';

function Landing(){
    
    const {navigate} = useNavigation();

    function handlerNavigateToGiveClassesPage(){
        navigate('GiveClasses');
    }

    function handlerNavigatorToStudyPage(){
        navigate('Study');
    }

    const [totalConnections, setTotalConnections] = useState(0); 
    
    useEffect(() => {
        api.get('connections').then(response => {

            console.log(response.data);
            const {total} = response.data;
            setTotalConnections(total);
        })
    }, []);

    return (
        
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />

            <Text style={styles.title}>
                Seja bem-vindo. {['\n']}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton 
                onPress={handlerNavigatorToStudyPage}
                    style={[styles.button, styles.buttonPrimary]}>
                    <Image source={stydyIcon} />
                    <Text style={styles.buttonText} >Estudar</Text>
                </RectButton>


                <RectButton onPress={handlerNavigateToGiveClassesPage}  style={[styles.button, styles.buttonSecundary]}>
                    <Image source={giveClessesIcon} />
                    <Text style={styles.buttonText} >Dar aulas</Text>
                </RectButton>

            </View>


            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>

        </View>
    );
}

export default Landing;