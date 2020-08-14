import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import  AsyncStorage  from '@react-native-community/async-storage';

import styles from './styles';
import heartOutilineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../serveces/api';


export interface Teacher {
    avatar: string;
    bio: string;
    cost: number;
    id: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}


const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {

    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsapp(){
        api.post('connections', {
            user_id: teacher.id,
        })
        Linking.openURL(`whatsapp://send?text=Hello World!&phone=${teacher.whatsapp}`)
    }

    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('favorites');

            
        let FavoritesArray = [];

        if(favorites)
        {
            FavoritesArray = JSON.parse(favorites);
        }


        if(isFavorited){
            const favoriteIndex = FavoritesArray.findIndex( (teacherItem: Teacher) => {
                return TeacherItem.id === teacher.id;
            } );

            FavoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        }
        else
        {   
            FavoritesArray.push(teacher);
            setIsFavorited(true);
            
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(FavoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
            
                <Image 
                    style={styles.avatar} 
                    source={{uri: teacher.avatar}} 
                />

                <View  style={styles.profileInfo}>
                    <Text  style={styles.name}>
                        {teacher.name}
                    </Text>
                    <Text  style={styles.subject}>
                    {teacher.subject}
                    </Text>
                </View>
            </View>
            
            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Precço/hora {'  '}
                    <Text style={styles.priceValue}>
                        R$ {teacher.cost}
                    </Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton 
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favoriteted : {}
                        ]}
                    >
                        { isFavorited  
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutilineIcon} />
                        }
                        
                        
                    </RectButton>


                    <RectButton onPress={handleLinkToWhatsapp}  style={styles.contactButton}>
                        <Image source={whatsappIcon} />

                        <Text style={styles.contactButtonText}> Entrar em contato </Text>
                    </RectButton>

                </View>
            </View>
        </View>
    );
}

export default TeacherItem;