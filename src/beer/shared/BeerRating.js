// import React, { Component } from 'react'
// import Rating from '@material-ui/lab/Rating'
// import Typography from '@material-ui/core/Typography'
// import Box from '@material-ui/core/Box'
//
// class BeerRating extends Component {
//   constructor (props){
//     super(props)
//
//     this.state = {
//       beer: {
//         state: 0
//       }
//     }
//   }
//   render () {
//     const { beer } = this.state
//
//   if (!beer.createdBeerId) {
//     return (
//       <div>
//         <Box component="fieldset" mb={3} borderColor="transparent">
//           <Typography component="legend">rating:</Typography>
//           <Rating
//             name="simple-controlled"
//             value={value}
//             onChange={(event, newValue) => {
//               setValue(newValue)
//             }}
//           />
//         </Box>
//       </div>
//     )
//   }
//   if (beer.createdBeerId) {
//     return (
//       <div>
//         <Box component="fieldset" mb={3} borderColor="transparent">
//           <Typography component="legend">Read only</Typography>
//           <Rating value={value} readOnly />
//         </Box>
//       </div>
//     )
//   }
// }
// }
// }
//
// export default BeerRating
