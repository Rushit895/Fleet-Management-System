import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

/**
 * StatCard: shows a number + label + optional icon.
 * Props:
 *   - title: string
 *   - value: number|string
 *   - icon: React element type (e.g. MUI Icon)
 *   - color: color string (e.g. "success.main")
 */
export function StatCard({ title, value, icon: Icon, color = "primary.main" }) {
  return (
    <Card variant="outlined" sx={{ minWidth: 150, borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          {Icon && <Icon sx={{ fontSize: 30, color, mr: 1 }} />}
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4" sx={{ color }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.elementType,
  color: PropTypes.string,
};
