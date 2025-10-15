import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import TicketsManager from "../../components/TicketsManager/";
import Ticket from "../../components/Ticket/";

import logo from "../../assets/logo.png";

import { i18n } from "../../translate/i18n";

const useStyles = makeStyles(theme => ({
	chatContainer: {
		flex: 1,
		padding: theme.spacing(4),
		height: `calc(100% - 48px)`,
		overflowY: "hidden",
	},

	chatPapper: {
		display: "flex",
		height: "100%",
		borderRadius: 16,
		overflow: "hidden",
		boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
	},

	contactsWrapper: {
		display: "flex",
		height: "100%",
		flexDirection: "column",
		overflowY: "hidden",
		borderRadius: "16px 0 0 16px",
	},
	messagessWrapper: {
		display: "flex",
		height: "100%",
		flexDirection: "column",
		borderRadius: "0 16px 16px 0",
	},
	welcomeMsg: {
		backgroundColor: theme.palette.boxticket,
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
		height: "100%",
		textAlign: "center",
		borderRadius: 16,
	},
}));

const Chat = () => {
	const classes = useStyles();
	const { ticketId } = useParams();

	return (
		<div className={classes.chatContainer}>
			<div className={classes.chatPapper}>
				<Grid container spacing={0}>
					<Grid item xs={4} className={classes.contactsWrapper}>
						<TicketsManager />
					</Grid>
					<Grid item xs={8} className={classes.messagessWrapper}>
						{ticketId ? (
							<>
								<Ticket />
							</>
						) : (
							<Paper square variant="outlined" className={classes.welcomeMsg}>
							
							<div>
							<center><img style={{ margin: "0 auto", width: "70%" }} src={logo} alt="logologin" /></center>
							</div>
							
							{/*<span>{i18n.t("chat.noTicketMessage")}</span>*/}
							</Paper>
						)}
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default Chat;
