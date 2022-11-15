import React, { useEffect, useState } from "react";
import ReactExport from "react-data-export";

// eslint-disable-next-line
const ExcelFile = ReactExport.ExcelFile;
// eslint-disable-next-line
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DEFAULT_COLOR = "d0cece";
const DATA_TYPE_OBJECT = "OBJECT";
const DATA_TYPE_STRING = "STRING";

const XLSXExport = ({ columns, data, fileName, substituteValues }) => {
  const [multiDataSet, setmultiDataSet] = useState([]);

  const variableChecks = (value, dataType) => {
    if (value === null || value === undefined) return false;
    if (dataType === DATA_TYPE_OBJECT && value === {}) return false;
    if (dataType === DATA_TYPE_STRING && value === "") return false;

    return true;
  };

  const validateAndReturnData = (key, val) => {
    if (val === null) return "-";

    if (key === "rowud") {
      return val.substring(0, val.indexOf(".")).replace("T", " ");
    }

    if (substituteValues && key in substituteValues) {
      return substituteValues[key][val];
    }

    return val;
  };

  const formulateColumns = () => {
    let tempStyles = {};

    columns.forEach((column) => {
      const { _style } = column;

      if (variableChecks(_style, DATA_TYPE_OBJECT)) {
        Object.keys(_style).forEach((el) => {
          if (el === "_isHeadingColored" && _style[el]) {
            if (variableChecks(_style._headingColor, DATA_TYPE_STRING)) {
              tempStyles.fill = {
                fgColor: { rgb: _style._headingColor },
              };
            } else {
              tempStyles.fill = {
                fgColor: { rgb: DEFAULT_COLOR },
              };
            }
          }
        });
        column.style = tempStyles;
        tempStyles = {};
      }
    });
    return columns;
  };

  useEffect(() => {
    const temp = [];
    data.forEach((element) => {
      const t = [];
      columns.forEach((col) => {
        const res = validateAndReturnData(
          col.dataIndex,
          element[col.dataIndex]
        );
        t.push({ value: res });
      });
      temp.push(t);
    });

    const dataset = [
      {
        columns: formulateColumns(),
        data: temp,
      },
    ];

    setmultiDataSet([...dataset]);
    window.setTimeout(() => setmultiDataSet([]), 500);
  }, [data]);

  return (
    <>
      {multiDataSet.length > 0 && (
        <ExcelFile hideElement="true" filename={fileName}>
          <ExcelSheet dataSet={multiDataSet} name="report" />
        </ExcelFile>
      )}
    </>
  );
};

export default XLSXExport;
