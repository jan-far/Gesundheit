const getRiskLevelForEactSubstance = (sub, value) => {
  const riskLevels = ["Low", "Moderate", "High"];
  value = parseInt(value);

  if (sub === "B") {
    if (value <= 10) return "Low";
    if (value <= 26) return "Moderate";
    if (value > 26) return "High";
  } else {
    if (value <= 3) return "Low";
    if (value <= 26) return "Moderate";
    if (value > 26) return "High";
  }
};

module.exports = {
  getAllSubstances: async (req, res, next) => {
    return res.status(200).json(substances);
  },
  calculateAssesment: async (req, res, next) => {
    const { answers } = req.body;
    if (!answers) return res.status(401).json({ msg: "Bad request!" });

    let SUB_J = null;

    // Get All Selected Substances Starting Selected from Q_1
    const allSelectedSubstancesLetters = {};
    answers.selectedSubstances_Q_1.map(item => {
      if (item.id === "J") SUB_J = item.name;
      allSelectedSubstancesLetters[item.id] = 0;
    });

    // Filter out any question array that is empty (FROM Q_2 to Q_7). e.g Q_5 : []; Q_5 will be removed
    const answeredQuestions_2_7 = [];

    Object.keys(answers).map(item => {
      // Exclude Q_1 and Q_8
      if (
        item === "selectedSubstances_Q_8" ||
        item === "selectedSubstances_Q_1"
      )
        return;
      if (answers[item].length)
        answeredQuestions_2_7.push({ name: item, answers: answers[item] });
    });

    // USE THESE VALUES BELOW TO CALCULATE CUMMULATIVE SCORES FOR EACH SUBSTACE SELCETED FROM Q_1
    // allSelectedSubstancesLetters,
    // answeredQuestions_2_7,

    answeredQuestions_2_7.map(x => {
      x.answers.map(i => {
        allSelectedSubstancesLetters[i.id] =
          allSelectedSubstancesLetters[i.id] + parseInt(i.value);
      });
    });

    // covert the values of allSelectedSubstancesLetters into array
    const data = Object.keys(allSelectedSubstancesLetters).map(item => ({
      substance: item,
      value: allSelectedSubstancesLetters[item],
    }));

    const getRiskLevels = data.map(item => ({
      substance: item.substance,
      value: item.value,
      riskLevel: getRiskLevelForEactSubstance(item.substance, item.value),
    }));

    return res.json({
      Q_8: answers.selectedSubstances_Q_8.patternOfInjecting,
      getRiskLevels,
      SUB_J,
    });
  },
};

const substances = {
  A: {
    name: "Tobacco products (cigarettes, chewing tobacco, cigars, etc.) ",
    risks: [
      "Premature aging, wrinkling of the skin",
      "Respiratory infections and asthma",
      "High blood pressure, diabetes",
      "Respiratory infections, allergies and asthma in children of smokers",
      "Miscarriage, premature labour and low birth weight babies for pregnant women",
      "Kidney disease",
      "Chronic obstructive airways disease ",
      "Heart disease, stroke, vascular disease",
      "Cancers",
    ],
  },
  B: {
    name: "Alcoholic beverages (beer, wine, spirits, etc.)",
    risks: [
      "Hangovers, aggressive and violent behaviour, accidents and injury",
      "Reduced sexual performance, premature ageing",
      "Digestive problems, ulcers, inflammation of the pancreas, high blood pressure",
      "Anxiety and depression, relationship difficulties, financial and work problems",
      "Difficulty remembering things and solving problems",
      "Deformities and brain damage in babies of pregnant women",
      "Stroke, permanent brain injury, muscle and nerve damage",
      "Liver disease, pancreas disease",
      "Cancers, suicide",
    ],
  },
  C: {
    name: "Cannabis (marijuana, pot, grass, hash, etc.)",
    risks: [
      "Problems with attention and motivation",
      "Anxiety, paranoia, panic, depression",
      "Decreased memory and problem solving ability",
      "High blood pressure",
      "Asthma, bronchitis",
      "Psychosis in those with a personal or family history of schizophrenia",
      "Heart disease and chronic obstructive airways disease",
      "Cancers",
    ],
  },
  D: {
    name: "Cocaine (coke, crack, etc.)",
    risks: [
      "Difficulty sleeping, heart racing, headaches, weight loss",
      "Numbness, tingling, clammy skin, skin scratching or picking",
      "Accidents and injury, financial problems ",
      "Irrational thoughts",
      "Mood swings - anxiety, depression, mania",
      "Aggression and paranoia",
      "Intense craving, stress from the lifestyle",
      "Psychosis after repeated use of high doses",
      "Sudden death from heart problems",
    ],
  },
  E: {
    name: "Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)",
    risks: [
      "Difficulty sleeping, loss of appetite and weight loss, dehydration",
      "jaw clenching, headaches, muscle pain",
      "Mood swings –anxiety, depression, agitation, mania, panic, paranoia",
      "Tremors, irregular heartbeat, shortness of breath",
      "Aggressive and violent behaviour",
      "Psychosis after repeated use of high doses",
      "Permanent damage to brain cells",
      "Liver damage, brain haemorrhage, sudden death (ecstasy) in rare situations",
    ],
  },
  F: {
    name: "Inhalants (nitrous, glue, petrol, paint thinner, etc.",
    risks: [
      "Dizziness and hallucinations, drowsiness, disorientation, blurred vision",
      "Flu like symptoms, sinusitis, nosebleeds",
      "Indigestion, stomach ulcers",
      "Accidents and injury",
      "Memory loss, confusion, depression, aggression",
      "Coordination difficulties, slowed reactions, hypoxia",
      "Delirium, seizures, coma, organ damage (heart, lungs, liver, kidneys)",
      "Death from heart failure",
    ],
  },
  G: {
    name: "Sedatives or Sleeping Pills (Valium, Serepax, Rohypnol, etc.)",
    risks: [
      "Drowsiness, dizziness and confusion",
      "Difficulty concentrating and remembering things",
      "Nausea, headaches, unsteady gait",
      "Anxiety and depression",
      "Tolerance and dependence after a short period of use.",
      "Severe withdrawal symptoms",
      "Overdose and death if used with alcohol, opioids or other depressant drugs.",
    ],
  },
  H: {
    name: "Hallucinogens (LSD, acid, mushrooms, PCP, Special K, etc.)",
    risks: [
      "Hallucinations (pleasant or unpleasant) – visual, auditory, tactile, olfactory",
      "Difficulty sleeping",
      "Nausea and vomiting",
      "Increased heart rate and blood pressure",
      "Mood swings",
      "Anxiety, panic, paranoia",
      "Flash-backs",
      "Increase the effects of mental illnesses such as schizophrenia ",
    ],
  },
  I: {
    name: "Opioids (heroin, morphine, methadone, codeine, etc.)",
    risks: [
      "Itching, nausea and vomiting",
      "Drowsiness",
      "Constipation, tooth decay",
      "Difficulty concentrating and remembering things",
      "Reduced sexual desire and sexual performance",
      "Relationship difficulties",
      "Financial and work problems, violations of law",
      "Tolerance and dependence, withdrawal symptoms",
      "Overdose and death from respiratory failure",
    ],
  },
};
