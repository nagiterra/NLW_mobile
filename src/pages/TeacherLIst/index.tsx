import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher} from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../serveces/api';

function TeacherList(){
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if( response ){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersId = favoritedTeachers.map((teacher: Teaacher) => {
                    return teacher.id;
                });

                setFavorites(favoritedTeachersId);
            }
        });
    }
    

    function handleToggleFilterVisible(){
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFilterSubmit(){
        loadFavorites(); 

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        console.log(response.data);
        setTeachers(response.data);

        setIsFilterVisible(false);
    }

    return (
        <View style={styles.container} >
            <PageHeader 
                title="Proffys disponiveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilterVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}
                >
                
                { isFilterVisible &&  
                    (
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>Matêria</Text>
                            <TextInput 
                                style={styles.input}
                                value={subject}
                                onChangeText={ text => setSubject(text)}
                                placeholder="Qual a matêria"
                                placeholderTextColor="#c1bccc"
                            />

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da semana</Text>
                                    <TextInput 
                                        style={styles.input}

                                        value={week_day}
                                        onChangeText={ text => setWeekDay(text)}
                                        placeholder="Qual o dia?"
                                        placeholderTextColor="#c1bccc"
                                    />
                                </View>


                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput 
                                        style={styles.input}

                                        value={time}
                                        onChangeText={ text => setTime(text)}
                                        placeholder="Qual o horário?"
                                        placeholderTextColor="#c1bccc"
                                    />
                                </View>
                            </View>

                            <RectButton onPress={handleFilterSubmit}  style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>
                                    Enviar
                                </Text>
                            </RectButton>
                        </View>
            )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
                >

                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                             />
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;