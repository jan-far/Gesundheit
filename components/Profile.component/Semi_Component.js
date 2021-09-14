import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Styles from "./assist.question.module.css";

import PropTypes from "prop-types";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import Brightness1Icon from "@material-ui/icons/Brightness1";
import ForwardIcon from "@material-ui/icons/Forward";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  appBar: {
    position: "fixed",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    height: "auto",
    flexGrow: 1,
    maxWidth: 600,
    marginBottom: 40,
  },
  accordion: {
    border: "1px solid #259c323a",
  },
}));
export const getFirstPartName = name => name.split("(")[0].trim();

export const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

export const RiskColored = ({ type, ml, mr }) => {
  let color = "black";
  let marginLeft = ml ? ml : 0;
  let marginRight = mr ? mr : 0;
  if (type === "low") color = "green";
  if (type === "moderate") color = "yellow";
  if (type === "high") color = "red";
  return (
    <Brightness1Icon
      style={{ fontSize: 20, color, marginLeft, marginRight, marginBottom: -5 }}
    />
  );
};
export const FirstComp = () => {
  return (
    <div className={Styles.feedback_first_comp}>
      <div>
        <b>
          <RiskColored type="low" mr="8" />
          Low:{" "}
        </b>
        You are at low risk of health and other problems from your current
        pattern of use.
      </div>
      <div>
        <b>
          <RiskColored type="moderate" mr="8" />
          Moderate:{" "}
        </b>
        You are at risk of health and other problems from your current pattern
        of substance use.
      </div>
      <div>
        <b>
          <RiskColored type="high" mr="8" />
          High:{" "}
        </b>
        You are at high risk of experiencing severe problems (health, social,
        financial, legal, High: relationship) as a result of your current
        pattern of use and are likely to be dependent
      </div>
    </div>
  );
};

export const SecondComp = ({ results, substances }) => {
  const classes = useStyles();
  if (!results) return null;
  const { getRiskLevels, Q_8, SUB_J } = results;

  return (
    <div className={Styles.feedback_second_comp}>
      {getRiskLevels.map(item => {
        if (item.substance === "J")
          return (
            <React.Fragment key={item.value + Math.random()}>
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<span></span>}
                  aria-controls={`panel1a-content-${item.value}`}
                  id={`panel1a-header-${item.value}`}
                >
                  <div className={classes.heading}>
                    <div>
                      <b>Substance:</b> {SUB_J}
                    </div>
                    <div>
                      <b>Risk Level:</b> {item.riskLevel}{" "}
                      <RiskColored type={item.riskLevel.toLowerCase()} ml="1" />{" "}
                    </div>
                    {/* <div>Substance Involvement Score: {item.value}</div> */}
                  </div>
                </AccordionSummary>
              </Accordion>
            </React.Fragment>
          );
        let substance = getFirstPartName(substances[item.substance].name);

        return (
          <React.Fragment key={item.value + Math.random()}>
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel1a-content-${item.value}`}
                id={`panel1a-header-${item.value}`}
              >
                <div className={classes.heading}>
                  <div>
                    <b>Substance:</b> {substance}
                  </div>
                  <div>
                    <b>Risk Level:</b> {item.riskLevel}{" "}
                    <RiskColored type={item.riskLevel.toLowerCase()} ml="1" />{" "}
                  </div>
                  {/* <div>Substance Involvement Score: {item.value}</div> */}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <h4>Regular use of {substance} is associated with: </h4>
                  <ul>
                    {substances[item.substance].risks.map(r => (
                      <li key={r + Math.random()}>{r}</li>
                    ))}
                  </ul>
                  <div className={Styles.feedback_accordion_last_text}>
                    Your risk of experiencing these harms is - {item.riskLevel}
                    <RiskColored
                      type={item.riskLevel.toLowerCase()}
                      ml="2"
                    />{" "}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const ThirdComp = () => {
  return (
    <div>
      <div className={Styles.feedback_title_sub}>
        Using substances by injection increases the risk of harm from substance
        use.
      </div>
      <div className={Styles.feedback_title_sub}>This harm can come from</div>
      <CustomizedTreeView_One />
      <div className={Styles.feedback_third_safer}>
        It is safer not to inject{" "}
      </div>

      <CustomizedTreeView_Two />

      <div className={Styles.feedback_title_sub}>
        If you use stimulant drugs like amphetamines or cocaine the following
        tips will help you reduce your risk of psychosis.{" "}
      </div>
      <CustomizedTreeView_Three />

      <div className={Styles.feedback_title_sub}>
        If you use depressant drugs like heroin the following tips will help you
        reduce your risk of overdose.
      </div>
      <CustomizedTreeView_Four />
    </div>
  );
};

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
  label: {
    color: "#b51414",
    fontFamily: "Quicksand, sans-serif",
  },
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const StyledTreeItem_B = withStyles(theme => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
  label: {
    color: "green",
    fontFamily: "Quicksand, sans-serif",
  },
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

function CustomizedTreeView_One() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["1", "2", "3"]}
      defaultCollapseIcon={<Brightness1Icon />}
      defaultExpandIcon={<Brightness1Icon />}
      defaultEndIcon={<ForwardIcon />}
    >
      <StyledTreeItem
        nodeId="1"
        label={
          <span className={Styles.feedback_tree_title}>The substance</span>
        }
      >
        <StyledTreeItem
          nodeId="4"
          label="If you inject any drug you are more likely to become dependent."
          style={{ color: "#b51414" }}
        />
        <StyledTreeItem
          nodeId="5"
          style={{ color: "#b51414" }}
          label="If you inject amphetamines or cocaine you are more likely to experience psychosis"
        />
        <StyledTreeItem
          nodeId="6"
          style={{ color: "#b51414" }}
          label=" If you inject heroin or other sedatives you are more likely to overdose."
        />
      </StyledTreeItem>

      <StyledTreeItem
        nodeId="2"
        label={
          <span className={Styles.feedback_tree_title}>
            The injecting behaviour
          </span>
        }
      >
        <StyledTreeItem
          style={{ color: "#b51414" }}
          nodeId="7"
          label="If you inject you may damage your skin and veins and get infections."
        />

        <StyledTreeItem
          nodeId="8"
          style={{ color: "#b51414" }}
          label="You may cause scars, bruises, swelling, abscesses and ulcers."
        />

        <StyledTreeItem
          style={{ color: "#b51414" }}
          nodeId="9"
          label="Your veins might collapse."
        />
        <StyledTreeItem
          nodeId="10"
          style={{ color: "#b51414" }}
          label="If you inject into the neck you can cause a stroke."
        />
      </StyledTreeItem>

      <StyledTreeItem
        nodeId="3"
        label={
          <span className={Styles.feedback_tree_title}>
            Sharing of injecting equipment
          </span>
        }
      >
        <StyledTreeItem
          nodeId="11"
          style={{ color: "#b51414" }}
          label="If you share injecting equipment (needles & syringes, spoons, filters, etc.) you are more likely to spread blood borne virus infections like Hepatitis B, Hepatitis C and HIV. "
        />
      </StyledTreeItem>
    </TreeView>
  );
}

function CustomizedTreeView_Two() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["1", "2", "3"]}
      defaultCollapseIcon={<Brightness1Icon />}
      defaultExpandIcon={<Brightness1Icon />}
      defaultEndIcon={<DoneAllIcon />}
    >
      <StyledTreeItem_B
        nodeId="1"
        label={
          <span className={Styles.feedback_tree_title}>If you do inject: </span>
        }
      >
        <StyledTreeItem_B
          nodeId="2"
          label="always use clean equipment (e.g., needles & syringes, spoons, filters, etc.)"
          style={{ color: "green" }}
        />
        <StyledTreeItem_B
          nodeId="3"
          style={{ color: "green" }}
          label="always use a new needle and syringe"
        />
        <StyledTreeItem_B
          nodeId="4"
          style={{ color: "green" }}
          label="don’t share equipment with other people"
        />
        <StyledTreeItem_B
          nodeId="5"
          style={{ color: "green" }}
          label="clean the preparation area"
        />{" "}
        <StyledTreeItem_B
          nodeId="6"
          style={{ color: "green" }}
          label="clean your hands"
        />{" "}
        <StyledTreeItem_B
          nodeId="7"
          style={{ color: "green" }}
          label="clean the injecting site"
        />{" "}
        <StyledTreeItem_B
          nodeId="8"
          style={{ color: "green" }}
          label="use a different injecting site each time"
        />{" "}
        <StyledTreeItem_B
          nodeId="9"
          style={{ color: "green" }}
          label="inject slowly"
        />{" "}
        <StyledTreeItem_B
          nodeId="4"
          style={{ color: "green" }}
          label="put your used needle and syringe in a hard container and dispose of it safely "
        />
      </StyledTreeItem_B>
    </TreeView>
  );
}

function CustomizedTreeView_Three() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["1", "2"]}
      defaultCollapseIcon={<Brightness1Icon />}
      defaultExpandIcon={<Brightness1Icon />}
      defaultEndIcon={<DoneAllIcon />}
    >
      <StyledTreeItem_B
        nodeId="1"
        label={<span className={Styles.feedback_tree_title}>Tips</span>}
      >
        <StyledTreeItem_B
          nodeId="2"
          label="avoid injecting and smoking"
          style={{ color: "green" }}
        />
        <StyledTreeItem_B
          nodeId="3"
          style={{ color: "green" }}
          label="avoid using on a daily basis "
        />
      </StyledTreeItem_B>
    </TreeView>
  );
}

function CustomizedTreeView_Four() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["1", "2"]}
      defaultCollapseIcon={<Brightness1Icon />}
      defaultExpandIcon={<Brightness1Icon />}
      defaultEndIcon={<DoneAllIcon />}
    >
      <StyledTreeItem_B
        nodeId="1"
        label={<span className={Styles.feedback_tree_title}>Tips</span>}
      >
        <StyledTreeItem_B
          nodeId="2"
          label="avoid using other drugs, especially sedatives or alcohol, on the same day"
          style={{ color: "green" }}
        />
        <StyledTreeItem_B
          nodeId="3"
          style={{ color: "green" }}
          label="use a small amount and always have a trial “taste” of a new batch"
        />
        <StyledTreeItem_B
          nodeId="4"
          style={{ color: "green" }}
          label="have someone with you when you are using"
        />
        <StyledTreeItem_B
          nodeId="5"
          style={{ color: "green" }}
          label="avoid injecting in places where no-one can get to you if you do overdose"
        />{" "}
        <StyledTreeItem_B
          nodeId="6"
          style={{ color: "green" }}
          label="know the telephone numbers of the ambulance service "
        />
      </StyledTreeItem_B>
    </TreeView>
  );
}
