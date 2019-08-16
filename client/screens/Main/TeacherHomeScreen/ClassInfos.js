import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Button } from '../../../components/Button';

/*
  * TODO :
  *
  * FAIRE DES BOUTONS AVEC DES ICONES POUR QUE CELA SOIT PLUS DESIGN
  * bouton pour créer un cours (avec génerer un qr code d’inscription au cours)
  * bouton pour créer une lecture d’un cours (avec qr code de présence)
*/

export default class ClassInfos extends Component {
    render() {
        return (
            <View>
                <Button
                    title={"Create a new class"}
                />
                
                <Button
                    title={"Create a new lecture"}
                />
            </View>
        );
    }
}