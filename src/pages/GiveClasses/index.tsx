import React from 'react';
import {View, ImageBackground, Text } from 'react-native';

import styles from './styles';
import giveClassesBdImage from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses(){

    const {goBack} = useNavigation();

    function handlerNavigateBack(){
        goBack();
    }
    return (
        <View style={styles.container} >
            <ImageBackground 
                resizeMethod="contain"  
                source={giveClassesBdImage} 
                style={styles.content}
            > 
                <Text style={styles.title}>Quer ser um proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>


            <RectButton onPress={handlerNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;