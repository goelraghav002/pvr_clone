import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const TheatreScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [rows, setRows] = useState([
		{
			row: 'A',
			seats: [
				{ seat: '1', bookingStatus: 'false' },
				{ seat: '2', bookingStatus: 'false' },
				{ seat: '3', bookingStatus: 'false' },
				{ seat: '4', bookingStatus: 'false' },
				{ seat: '5', bookingStatus: 'false' },
				{ seat: '6', bookingStatus: 'false' },
				{ seat: '7', bookingStatus: 'false' },
			],
		},
		{
			row: 'B',
			seats: [
				{ seat: '1', bookingStatus: 'false' },
				{ seat: '2', bookingStatus: 'false' },
				{ seat: '3', bookingStatus: 'false' },
				{ seat: '4', bookingStatus: 'false' },
				{ seat: '5', bookingStatus: 'false' },
				{ seat: '6', bookingStatus: 'false' },
				{ seat: '7', bookingStatus: 'false' },
			],
		},
		{
			row: 'C',
			seats: [
				{ seat: '1', bookingStatus: 'false' },
				{ seat: '2', bookingStatus: 'false' },
				{ seat: '3', bookingStatus: 'false' },
				{ seat: '4', bookingStatus: 'false' },
				{ seat: '5', bookingStatus: 'false' },
				{ seat: '6', bookingStatus: 'false' },
				{ seat: '7', bookingStatus: 'false' },
			],
		},
		{
			row: 'D',
			seats: [
				{ seat: '1', bookingStatus: 'false' },
				{ seat: '2', bookingStatus: 'false' },
				{ seat: '3', bookingStatus: 'false' },
				{ seat: '4', bookingStatus: 'false' },
				{ seat: '5', bookingStatus: 'false' },
				{ seat: '6', bookingStatus: 'false' },
				{ seat: '7', bookingStatus: 'false' },
			],
		},
		{
			row: 'E',
			seats: [
				{ seat: '1', bookingStatus: 'false' },
				{ seat: '2', bookingStatus: 'false' },
				{ seat: '3', bookingStatus: 'false' },
				{ seat: '4', bookingStatus: 'false' },
				{ seat: '5', bookingStatus: 'false' },
				{ seat: '6', bookingStatus: 'false' },
				{ seat: '7', bookingStatus: 'false' },
			],
		},
	]);
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<Pressable
					style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
				>
					<Ionicons
						onPress={() => navigation.goBack()}
						name='arrow-back'
						size={24}
						color='black'
					/>
					<Text>{route.params.mall}</Text>
				</Pressable>
			),
			headerTitle: '',
			headerStyle: {
				backgroundColor: '#f5f5f5',
				shadowColor: 'transparent',
				shadowOpacity: 0.3,
				shadowOffset: { width: -1, height: 1 },
				shadowRadius: 3,
			},
		});
	}, []);

	const renderSeats = () => {
		return rows.map((row, rowIndex) => {
			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 10,
					}}
					key={rowIndex}
				>
					<View style={{ width: 30, marginRight: 2 }}>
						<Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>
							{row.row}
						</Text>
					</View>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							{row.seats.map((seat, seatIndex) => (
								<Pressable
									onPress={() => handleSeatPress(row.row, seat.seat)}
									style={[
										styles.seat,
										selectedSeats.some(
											(selectedSeat) =>
												selectedSeat.row === row.row &&
												selectedSeat.seat === seat.seat
                                        ) && styles.selectedSeat,
                                        seat.bookingStatus === 'disabled' && styles.bookedSeat
                                    ]}
                                    disabled={seat.bookingStatus === 'disabled'}
								>
									<Text>{seat.seat}</Text>
								</Pressable>
							))}
						</View>
					</ScrollView>
				</View>
			);
		});
	};

	const handleSeatPress = (row, seat) => {
		console.log('row ', row);
		console.log('seat ', seat);

		const isSelected = selectedSeats.some(
			(selectedSeat) => selectedSeat.row === row && selectedSeat.seat === seat
		);

		if (isSelected) {
			setSelectedSeats((prevState) =>
				prevState.filter(
					(selectedSeat) =>
						selectedSeat.row !== row && selectedSeat.seat !== seat
				)
			);
		} else {
			setSelectedSeats((prevState) => [...prevState, { row, seat }]);
		}
	};
	console.log(selectedSeats);

	const pay = () => {
		const updatedRows = [...rows];
		selectedSeats.forEach((seat) => {
			const rowIndex = updatedRows.findIndex((row) => row.row === seat.row);
			console.log('row index', rowIndex);
			const seatIndex = updatedRows[rowIndex].seats.findIndex(
				(s) => s.seat === seat.seat
			);
			console.log('seat index', seatIndex);
			updatedRows[rowIndex].seats[seatIndex].bookingStatus = 'disabled';

			setRows(updatedRows);
			setSelectedSeats([]);
		});
	};

	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<Text style={{ marginTop: 10, textAlign: 'center', fontSize: 15 }}>
				SCREEN THIS WAY
			</Text>
			<Text
				style={{
					marginTop: 10,
					textAlign: 'center',
					fontSize: 15,
					color: 'gray',
				}}
			>
				CLASSIC (240)
			</Text>

			{renderSeats()}

			<View
				style={{
					backgroundColor: '#D8D8D8',
					padding: 10,
					marginTop: 25,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 30,
				}}
			>
				<View>
					<FontAwesome
						style={{ textAlign: 'center', marginBottom: 4 }}
						name='square'
						size={24}
						color='#ffc40c'
					/>
					<Text>Selected</Text>
				</View>
				<View>
					<FontAwesome
						style={{ textAlign: 'center', marginBottom: 4 }}
						name='square'
						size={24}
						color='white'
					/>
					<Text>Vacant</Text>
				</View>
				<View>
					<FontAwesome
						style={{ textAlign: 'center', marginBottom: 4 }}
						name='square'
						size={24}
						color='gray'
					/>
					<Text>Occupied</Text>
				</View>
			</View>
			<Pressable
				onPress={pay}
				style={{
					marginTop: 50,
					backgroundColor: '#E0E0E0',
					padding: 10,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Text>Selected Seats</Text>
				<Text>Pay 100</Text>
			</Pressable>
		</View>
	);
};

export default TheatreScreen;

const styles = StyleSheet.create({
	seat: {
		width: 38,
		height: 38,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
		backgroundColor: 'white',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#C0C0C0',
	},

	selectedSeat: {
		backgroundColor: '#ffd700',
		borderColor: 'transparent',
    },
    bookedSeat: {
        backgroundColor: '#989898',
        borderColor: 'transparent'
    }
});
