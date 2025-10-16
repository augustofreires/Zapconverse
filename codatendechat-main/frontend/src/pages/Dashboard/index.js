import React, { useContext, useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";

import CallIcon from "@material-ui/icons/Call";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import TimerIcon from '@material-ui/icons/Timer';

import { makeStyles } from "@material-ui/core/styles";
import { grey, blue } from "@material-ui/core/colors";
import { toast } from "react-toastify";

import ButtonWithSpinner from "../../components/ButtonWithSpinner";

import TableAttendantsStatus from "../../components/Dashboard/TableAttendantsStatus";
import { isArray } from "lodash";

import useDashboard from "../../hooks/useDashboard";
import useContacts from "../../hooks/useContacts";
import { ChatsUser } from "./ChartsUser"

import { isEmpty } from "lodash";
import moment from "moment";
import { ChartsDate } from "./ChartsDate";
import { i18n } from "../../translate/i18n";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.padding,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    height: 240,
    overflowY: "auto",
    ...theme.scrollbarStyles,
  },
  cardAvatar: {
    fontSize: "55px",
    color: grey[500],
    backgroundColor: "#ffffff",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardTitle: {
    fontSize: "18px",
    color: blue[700],
  },
  cardSubtitle: {
    color: grey[600],
    fontSize: "14px",
  },
  alignRight: {
    textAlign: "right",
  },
  fullWidth: {
    width: "100%",
  },
  selectContainer: {
    width: "100%",
    textAlign: "left",
  },
  iframeDashboard: {
    width: "100%",
    height: "calc(100vh - 64px)",
    border: "none",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 240,
  },
  customFixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 120,
  },
  customFixedHeightPaperLg: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
  },
  card1: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 rgba(102, 126, 234, 0.25)",
    border: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px 0 rgba(102, 126, 234, 0.35)",
    },
  },
  cardTitle: {
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    opacity: 0.9,
    marginBottom: theme.spacing(2),
  },
  cardNumber: {
    fontSize: "3rem",
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: "-0.5px",
  },
  cardIcon: {
    fontSize: 64,
    opacity: 0.3,
  },
  card2: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 rgba(240, 147, 251, 0.25)",
    border: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px 0 rgba(240, 147, 251, 0.35)",
    },
  },
  card3: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 rgba(79, 172, 254, 0.25)",
    border: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px 0 rgba(79, 172, 254, 0.35)",
    },
  },
  card4: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
      : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 rgba(67, 233, 123, 0.25)",
    border: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px 0 rgba(67, 233, 123, 0.35)",
    },
  },
  card5: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
      : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    color: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 rgba(250, 112, 154, 0.25)",
    border: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px 0 rgba(250, 112, 154, 0.35)",
    },
  },
  card6: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
      : 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    color: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 rgba(48, 207, 208, 0.25)",
    border: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px 0 rgba(48, 207, 208, 0.35)",
    },
  },
  card7: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
      : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    color: "#333",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 rgba(168, 237, 234, 0.25)",
    border: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px 0 rgba(168, 237, 234, 0.35)",
    },
  },
  card8: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
      : 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    color: "#333",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 rgba(255, 154, 158, 0.25)",
    border: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px 0 rgba(255, 154, 158, 0.35)",
    },
  },
  card9: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
      : 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    color: "#333",
    borderRadius: "16px",
    boxShadow: "0 4px 20px 0 rgba(251, 194, 235, 0.25)",
    border: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 30px 0 rgba(251, 194, 235, 0.35)",
    },
  },
  fixedHeightPaper2: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [counters, setCounters] = useState({});
  const [attendants, setAttendants] = useState([]);
  const [period, setPeriod] = useState(0);
  const [filterType, setFilterType] = useState(1);
  const [dateFrom, setDateFrom] = useState(moment("1", "D").format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const { find } = useDashboard();

  useEffect(() => {
    async function firstLoad() {
      await fetchData();
    }
    setTimeout(() => {
      firstLoad();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
    async function handleChangePeriod(value) {
    setPeriod(value);
  }

  async function handleChangeFilterType(value) {
    setFilterType(value);
    if (value === 1) {
      setPeriod(0);
    } else {
      setDateFrom("");
      setDateTo("");
    }
  }

  async function fetchData() {
    setLoading(true);

    let params = {};

    if (period > 0) {
      params = {
        days: period,
      };
    }

    if (!isEmpty(dateFrom) && moment(dateFrom).isValid()) {
      params = {
        ...params,
        date_from: moment(dateFrom).format("YYYY-MM-DD"),
      };
    }

    if (!isEmpty(dateTo) && moment(dateTo).isValid()) {
      params = {
        ...params,
        date_to: moment(dateTo).format("YYYY-MM-DD"),
      };
    }

    if (Object.keys(params).length === 0) {
      toast.error(i18n.t("dashboard.toasts.selectFilterError"));
      setLoading(false);
      return;
    }

    const data = await find(params);

    setCounters(data.counters);
    if (isArray(data.attendants)) {
      setAttendants(data.attendants);
    } else {
      setAttendants([]);
    }

    setLoading(false);
  }

  function formatTime(minutes) {
    return moment()
      .startOf("day")
      .add(minutes, "minutes")
      .format("HH[h] mm[m]");
  }

    const GetContacts = (all) => {
    let props = {};
    if (all) {
      props = {};
    }
    const { count } = useContacts(props);
    return count;
  };
  
    function renderFilters() {
    if (filterType === 1) {
      return (
        <>
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              label={i18n.t("dashboard.filters.initialDate")}
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={classes.fullWidth}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              label={i18n.t("dashboard.filters.finalDate")}
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={classes.fullWidth}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
            />
          </Grid>
        </>
      );
    } else {
      return (
        <Grid item xs={12} sm={4} md={3}>
          <FormControl className={classes.selectContainer} variant="outlined" size="small">
            <InputLabel id="period-selector-label">
              {i18n.t("dashboard.periodSelect.title")}
            </InputLabel>
            <Select
              labelId="period-selector-label"
              id="period-selector"
              value={period}
              onChange={(e) => handleChangePeriod(e.target.value)}
              label={i18n.t("dashboard.periodSelect.title")}
            >
              <MenuItem value={0}>{i18n.t("dashboard.periodSelect.options.none")}</MenuItem>
              <MenuItem value={3}>{i18n.t("dashboard.periodSelect.options.last3")}</MenuItem>
              <MenuItem value={7}>{i18n.t("dashboard.periodSelect.options.last7")}</MenuItem>
              <MenuItem value={15}>{i18n.t("dashboard.periodSelect.options.last15")}</MenuItem>
              <MenuItem value={30}>{i18n.t("dashboard.periodSelect.options.last30")}</MenuItem>
              <MenuItem value={60}>{i18n.t("dashboard.periodSelect.options.last60")}</MenuItem>
              <MenuItem value={90}>{i18n.t("dashboard.periodSelect.options.last90")}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      );
    }
  }

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} justifyContent="flex-end">
		

          {/* EM ATENDIMENTO */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card1}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={classes.cardTitle}>
                    {i18n.t("dashboard.counters.inTalk")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {counters.supportHappening}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <CallIcon className={classes.cardIcon} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* AGUARDANDO */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card2}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={classes.cardTitle}>
                    {i18n.t("dashboard.counters.waiting")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {counters.supportPending}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <HourglassEmptyIcon className={classes.cardIcon} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* ATENDENTES ATIVOS */}
			  {/*<Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card6}
              style={{ overflow: "hidden" }}
              elevation={6}
            >
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Typography
                    component="h3"
                    variant="h6"
                    paragraph
                  >
                    Conversas Ativas
                  </Typography>
                  <Grid item>
                    <Typography
                      component="h1"
                      variant="h4"
                    >
                      {GetUsers()}
                      <span
                        style={{ color: "#805753" }}
                      >
                        /{attendants.length}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <RecordVoiceOverIcon
                    style={{
                      fontSize: 100,
                      color: "#805753",
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
</Grid>*/}

          {/* FINALIZADOS */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card3}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={classes.cardTitle}>
                    {i18n.t("dashboard.counters.finished")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {counters.supportFinished}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <CheckCircleIcon className={classes.cardIcon} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* NOVOS CONTATOS */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card4}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={classes.cardTitle}>
                    {i18n.t("dashboard.counters.newContacts")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {GetContacts(true)}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <GroupAddIcon className={classes.cardIcon} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          
          {/* T.M. DE ATENDIMENTO */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card8}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={classes.cardTitle}>
                    {i18n.t("dashboard.counters.averageTalkTime")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {formatTime(counters.avgSupportTime)}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <AccessAlarmIcon className={classes.cardIcon} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* T.M. DE ESPERA */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card9}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={classes.cardTitle}>
                    {i18n.t("dashboard.counters.averageWaitTime")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {formatTime(counters.avgWaitTime)}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <TimerIcon className={classes.cardIcon} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
		  
		  {/* FILTROS */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl className={classes.selectContainer}>
              <InputLabel id="period-selector-label">{i18n.t("dashboard.filters.filterType.title")}</InputLabel>
              <Select
                labelId="period-selector-label"
                value={filterType}
                onChange={(e) => handleChangeFilterType(e.target.value)}
              >
                <MenuItem value={1}>{i18n.t("dashboard.filters.filterType.options.perDate")}</MenuItem>
                <MenuItem value={2}>{i18n.t("dashboard.filters.filterType.options.perPeriod")}</MenuItem>
              </Select>
              <FormHelperText>
                {i18n.t("dashboard.filters.filterType.helper")}
              </FormHelperText>
            </FormControl>
          </Grid>

          {renderFilters()}

          {/* BOTAO FILTRAR */}
          <Grid item xs={12} className={classes.alignRight}>
            <ButtonWithSpinner
              loading={loading}
              onClick={() => fetchData()}
              variant="contained"
              color="primary"
            >
              {i18n.t("dashboard.buttons.filter")}
            </ButtonWithSpinner>
          </Grid>

          {/* USUARIOS ONLINE */}
          <Grid item xs={12}>
            {attendants.length ? (
              <TableAttendantsStatus
                attendants={attendants}
                loading={loading}
              />
            ) : null}
          </Grid>

          {/* TOTAL DE ATENDIMENTOS POR USUARIO */}
          <Grid item xs={12}>
            <Paper className={classes.fixedHeightPaper2}>
              <ChatsUser />
            </Paper>
          </Grid>

          {/* TOTAL DE ATENDIMENTOS */}
          <Grid item xs={12}>
            <Paper className={classes.fixedHeightPaper2}>
              <ChartsDate />
            </Paper>
          </Grid>

        </Grid>
      </Container >
    </div >
  );
};

export default Dashboard;
